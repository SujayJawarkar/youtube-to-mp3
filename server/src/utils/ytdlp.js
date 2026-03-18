const YTDlpWrapModule = require("yt-dlp-wrap");
const YTDlpWrap = YTDlpWrapModule.default;
const path = require("path");

const binaryPath = path.join(__dirname, "../../bin/yt-dlp.exe");

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
      .exec([
        url,
        "-f",
        "bestaudio", // download best audio stream
        "-o",
        outputPath, // output path
        "--no-playlist", // don't download full playlist
      ])
      .on("close", () => resolve(outputPath))
      .on("error", (err) => reject(err));
  });
};

module.exports = { getVideoInfo, downloadAudio };
