const axios = require("axios");

const getVideoInfo = async (url) => {
  // Extract video ID from URL
  const videoId = extractVideoId(url);
  if (!videoId) throw new Error("Invalid YouTube URL");

  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos",
    {
      params: {
        part: "snippet,contentDetails",
        id: videoId,
        key: process.env.YOUTUBE_API_KEY,
      },
    },
  );

  const video = response.data.items[0];
  if (!video) throw new Error("Video not found");

  return {
    title: video.snippet.title,
    thumbnail:
      video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url,
    duration: formatDuration(video.contentDetails.duration), // PT3M33S → 3:33
    videoId,
  };
};

// Extract video ID from various YouTube URL formats
const extractVideoId = (url) => {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Convert ISO 8601 duration (PT3M33S) to readable format (3:33)
const formatDuration = (iso) => {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

module.exports = { getVideoInfo, extractVideoId };
