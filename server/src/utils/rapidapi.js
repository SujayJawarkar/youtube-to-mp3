const axios = require("axios");
const fs = require("fs");

const RAPIDAPI_HOST = "youtube-mp36.p.rapidapi.com";

// Poll until status is 'ok' or 'fail'
const requestMp3 = async (videoId, quality) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  while (true) {
    const response = await axios.get(`https://${RAPIDAPI_HOST}/dl`, {
      params: { id: videoId },
      headers: {
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    });

    const { status, link, msg } = response.data;

    console.log("RapidAPI status:", status);

    if (status === "ok" && link) {
      return link;
    }

    if (status === "fail") {
      throw new Error(`RapidAPI failed: ${msg}`);
    }

    // status === 'processing' — wait 1 second and try again
    console.log("Processing... retrying in 1 second");
    await delay(1000);
  }
};

const downloadMp3 = async (videoId, outputPath, quality) => {
  // Step 1 — Get MP3 link (with polling for processing status)
  console.log("Requesting MP3 from RapidAPI...");
  const mp3Link = await requestMp3(videoId, quality);

  // Step 2 — Download the MP3 file from the returned link
  console.log("Downloading MP3 from link...");
  const mp3Response = await axios.get(mp3Link, {
    responseType: "stream",
    headers: {
      // Required to whitelist the download request
      Referer: "https://ytjar.info/",
    },
  });

  // Step 3 — Save to temp folder
  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(outputPath);
    mp3Response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  return outputPath;
};

module.exports = { downloadMp3 };
