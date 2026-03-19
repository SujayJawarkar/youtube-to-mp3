const axios = require("axios");
const fs = require("fs");

const RAPIDAPI_HOST = "youtube-mp36.p.rapidapi.com";

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

    console.log("Processing... retrying in 1 second");
    await delay(1000);
  }
};

const downloadMp3 = async (videoId, outputPath, quality) => {
  console.log("Requesting MP3 from RapidAPI...");
  const mp3Link = await requestMp3(videoId, quality);

  console.log("Downloading MP3 from link...");
  const mp3Response = await axios.get(mp3Link, {
    responseType: "stream",
    headers: {
      Referer: "https://ytjar.info/",
    },
  });

  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(outputPath);
    mp3Response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  return outputPath;
};

module.exports = { downloadMp3 };
