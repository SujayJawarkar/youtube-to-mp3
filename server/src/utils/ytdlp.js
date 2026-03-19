const YTDlpWrapModule = require("yt-dlp-wrap");
const YTDlpWrap = YTDlpWrapModule.default;
const path = require("path");
const { getProxy } = require("./proxyManager.js");
const limiter = require("./rateLimiter.js");

const binaryName = process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp";
const binaryPath = path.join(__dirname, "../../bin", binaryName);

const ytDlp = new YTDlpWrap(binaryPath);

// List of real browser user agents to rotate through
const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
];

const getRandomUserAgent = () => {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const buildBaseArgs = () => {
  const args = [
    "--user-agent",
    getRandomUserAgent(),
    "--no-playlist",
    "--socket-timeout",
    "30",
    "--retries",
    "3",
  ];

  const proxy = getProxy();
  if (proxy) {
    args.push("--proxy", proxy);
    console.log(`Using proxy: ${proxy}`);
  }

  return args;
};

// Rate limited version of getVideoInfo
const getVideoInfo = async (url) => {
  return limiter.schedule(async () => {
    console.log("Fetching video info...");

    const args = [url, ...buildBaseArgs()];
    const metadata = await ytDlp.getVideoInfo(args);

    return {
      title: metadata.title,
      thumbnail: metadata.thumbnail,
      duration: metadata.duration_string,
      videoId: metadata.id,
    };
  });
};

// Rate limited version of downloadAudio
const downloadAudio = (url, outputPath) => {
  return limiter.schedule(() => {
    return new Promise((resolve, reject) => {
      console.log("Downloading audio...");

      const args = [url, "-o", outputPath, ...buildBaseArgs()];

      ytDlp
        .exec(args)
        .on("close", () => resolve(outputPath))
        .on("error", (err) => reject(err));
    });
  });
};

module.exports = { getVideoInfo, downloadAudio };
