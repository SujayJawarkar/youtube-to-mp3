import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;
function QualitySelector({
  url,
  quality,
  setQuality,
  setStatus,
  setJobId,
  setTitle,
}) {
  const handleConvert = async () => {
    setStatus("converting");

    try {
      const res = await axios.post(`${BASE_URL}/convert`, { url, quality });
      setJobId(res.data.jobId);
      setTitle(res.data.title);
      setStatus("done");
      toast.success("Conversion complete!");
    } catch (err) {
      setStatus("error");
      toast.error("Conversion failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {["128", "320"].map((q) => (
          <button
            key={q}
            onClick={() => setQuality(q)}
            className={`flex-1 py-2 rounded-lg font-semibold transition border-2 ${
              quality === q
                ? "border-red-500 bg-red-500 text-white"
                : "border-gray-600 text-gray-400 hover:border-red-400"
            }`}
          >
            {q} kbps
          </button>
        ))}
      </div>

      <button
        onClick={handleConvert}
        className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold text-white transition"
      >
        Convert to MP3
      </button>
    </div>
  );
}

export default QualitySelector;
