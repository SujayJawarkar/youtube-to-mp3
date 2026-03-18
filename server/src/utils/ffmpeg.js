const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

// On Windows use local binary, on Linux use system ffmpeg
if (process.platform === "win32") {
  const ffmpegPath = path.join(__dirname, "../../bin/ffmpeg.exe");
  ffmpeg.setFfmpegPath(ffmpegPath);
}

const convertToMp3 = (inputPath, outputPath, quality) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .audioBitrate(quality)
      .toFormat("mp3")
      .on("end", () => resolve(outputPath))
      .on("error", (err) => reject(err))
      .save(outputPath);
  });
};

module.exports = { convertToMp3 };
