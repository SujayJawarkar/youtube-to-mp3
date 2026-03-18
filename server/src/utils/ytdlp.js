const YTDlpWrapModule = require("yt-dlp-wrap");
const YTDlpWrap = YTDlpWrapModule.default;
const path = require("path");

// Use .exe on Windows, plain binary on Linux
const binaryName = process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp";
const binaryPath = path.join(__dirname, "../../bin", binaryName);

const ytDlp = new YTDlpWrap(binaryPath);

const getVideoInfo = async (url) => {
  const metadata = await ytDlp.getVideoInfo(url);
  return {
    title: metadata.title,
    thumbnail: metadata.thumbnail,
    duration: metadata.duration_string,
    videoId: metadata.id,
  };
};

const downloadAudio = (url, outputPath) => {
  return new Promise((resolve, reject) => {
    ytDlp
      .exec([url, "-f", "bestaudio", "-o", outputPath, "--no-playlist"])
      .on("close", () => resolve(outputPath))
      .on("error", (err) => reject(err));
  });
};

module.exports = { getVideoInfo, downloadAudio };
