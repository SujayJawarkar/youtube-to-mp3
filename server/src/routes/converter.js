const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { getVideoInfo, downloadAudio } = require("../utils/ytdlp.js");
const { convertToMp3 } = require("../utils/ffmpeg.js");

const tempDir = path.join(__dirname, "../../temp");
const jobTitles = {}; // stores jobId → video title

// POST /api/info
router.post("/info", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const info = await getVideoInfo(url);
    res.json(info);
  } catch (error) {
    console.error("Error fetching video info:", error.message);
    res.status(500).json({ error: "Failed to fetch video info." });
  }
});

// POST /api/convert
router.post("/convert", async (req, res) => {
  const { url, quality } = req.body;

  if (!url || !quality) {
    return res.status(400).json({ error: "URL and quality are required" });
  }

  const jobId = uuidv4();
  const rawAudioPath = path.join(tempDir, `${jobId}.webm`);
  const mp3Path = path.join(tempDir, `${jobId}.mp3`);

  try {
    // Step 1 - Fetch video info to get title
    console.log("Fetching video info...");
    const info = await getVideoInfo(url);
    const videoTitle = info.title;

    // Store title against jobId
    jobTitles[jobId] = videoTitle;

    // Step 2 - Download raw audio
    console.log("Downloading audio...");
    await downloadAudio(url, rawAudioPath);

    // Step 3 - Convert to MP3
    console.log("Converting to MP3...");
    await convertToMp3(rawAudioPath, mp3Path, quality);

    // Step 4 - Delete raw audio
    fs.unlinkSync(rawAudioPath);

    console.log("Done! Job ID:", jobId);
    res.json({ jobId, title: videoTitle });
  } catch (error) {
    console.error("Conversion error:", error.message);
    if (fs.existsSync(rawAudioPath)) fs.unlinkSync(rawAudioPath);
    if (fs.existsSync(mp3Path)) fs.unlinkSync(mp3Path);
    res.status(500).json({ error: "Conversion failed." });
  }
});

// GET /api/stream/:jobId
router.get("/stream/:jobId", (req, res) => {
  const { jobId } = req.params;
  const mp3Path = path.join(tempDir, `${jobId}.mp3`);

  if (!fs.existsSync(mp3Path)) {
    return res.status(404).json({ error: "File not found" });
  }

  const stat = fs.statSync(mp3Path);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    // Handle range requests — needed for audio seeking in browser
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;

    const fileStream = fs.createReadStream(mp3Path, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "audio/mpeg",
    });

    fileStream.pipe(res);
  } else {
    // No range — stream the whole file
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "audio/mpeg",
    });

    fs.createReadStream(mp3Path).pipe(res);
  }
});

// GET /api/download/:jobId
router.get("/download/:jobId", (req, res) => {
  const { jobId } = req.params;
  const mp3Path = path.join(tempDir, `${jobId}.mp3`);

  if (!fs.existsSync(mp3Path)) {
    return res.status(404).json({ error: "File not found" });
  }

  // Use stored title or fallback to 'audio'
  const title = jobTitles[jobId] || "audio";

  // Sanitize title — remove characters that are invalid in filenames
  const safeTitle = title.replace(/[^a-z0-9\-_ ]/gi, "").trim();
  const fileName = `${safeTitle}.mp3`;

  res.download(mp3Path, fileName, (err) => {
    if (err) console.error("Download error:", err.message);

    // Cleanup
    delete jobTitles[jobId];
    fs.unlink(mp3Path, (unlinkErr) => {
      if (unlinkErr) console.error("Cleanup error:", unlinkErr.message);
      else console.log(`Temp file deleted: ${fileName}`);
    });
  });
});

module.exports = router;
