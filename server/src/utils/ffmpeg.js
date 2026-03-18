const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

// On Windows use .exe, on Linux use plain binary
const ffmpegBinary = process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg";
const ffmpegPath = path.join(__dirname, "../../bin", ffmpegBinary);

ffmpeg.setFfmpegPath(ffmpegPath);

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
