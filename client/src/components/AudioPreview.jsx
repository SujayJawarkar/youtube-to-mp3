import { useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

function AudioPreview({ jobId, title, onReset }) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    if (downloaded) return;
    setDownloaded(true);
    toast.success("Download started!");

    // Trigger download
    window.location.href = `${BASE_URL}/download/${jobId}`;

    // Wait a bit then reset the whole app UI
    setTimeout(() => {
      toast("Ready for another conversion! 🎵", { icon: "🔄" });
      onReset();
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-700 rounded-xl p-4">
      <p className="font-semibold text-white line-clamp-1">🎵 {title}</p>

      {/* Audio preview — only show before download */}
      {!downloaded && (
        <audio
          controls
          className="w-full"
          src={`${BASE_URL}/stream/${jobId}`}
        />
      )}

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={downloaded}
        className={`w-full py-3 rounded-lg font-bold text-white text-center transition ${
          downloaded
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600 cursor-pointer"
        }`}
      >
        {downloaded ? "✅ Downloaded!" : "⬇️ Download MP3"}
      </button>

      {/* Convert another button */}
      <button
        onClick={onReset}
        className="w-full py-2 rounded-lg font-semibold text-gray-300 border border-gray-500 hover:border-red-400 hover:text-red-400 transition"
      >
        🔄 Convert Another Video
      </button>
    </div>
  );
}

export default AudioPreview;
