import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;
function UrlInput({ url, setUrl, setVideoInfo, setStatus }) {
  const handleFetch = async () => {
    if (!url.trim()) return toast.error("Please enter a YouTube URL");

    setStatus("fetching");
    setVideoInfo(null);

    try {
      const res = await axios.post(`${BASE_URL}/info`, { url });
      setVideoInfo(res.data);
      setStatus("idle");
      toast.success("Video found!");
    } catch (err) {
      setStatus("error");
      toast.error("Could not fetch video. Check the URL.");
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Paste YouTube URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
      />
      <button
        onClick={handleFetch}
        className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition"
      >
        Fetch
      </button>
    </div>
  );
}

export default UrlInput;
