const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

// Point fluent-ffmpeg to your local ffmpeg binary
const ffmpegPath = path.join(__dirname, "../../bin/ffmpeg.exe");
ffmpeg.setFfmpegPath(ffmpegPath);

const convertToMp3 = (inputPath, outputPath, quality) => {
  return new Promise((resolve, reject) => {
    // quality is '128' or '320'
    ffmpeg(inputPath)
      .audioBitrate(quality)
      .toFormat("mp3")
      .on("end", () => resolve(outputPath))
      .on("error", (err) => reject(err))
      .save(outputPath);
  });
};

module.exports = { convertToMp3 };
