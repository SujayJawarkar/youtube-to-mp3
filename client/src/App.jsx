import { useState } from "react";
import { Toaster } from "react-hot-toast";
import UrlInput from "./components/UrlInput";
import VideoCard from "./components/VideoCard";
import QualitySelector from "./components/QualitySelector";
import ProgressBar from "./components/ProgressBar";
import AudioPreview from "./components/AudioPreview";

function App() {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null); // title, thumbnail, duration
  const [quality, setQuality] = useState("128");
  const [status, setStatus] = useState("idle"); // idle | fetching | converting | done | error
  const [jobId, setJobId] = useState(null);
  const [title, setTitle] = useState("");

  const handleReset = () => {
    setUrl("");
    setVideoInfo(null);
    setQuality("128");
    setStatus("idle");
    setJobId(null);
    setTitle("");
  };

  return (
    <div className="min-h-screen  bg-linear-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6">
      <Toaster position="top-right" />

      <h1 className="text-4xl font-bold mb-2 text-red-500">YT to MP3</h1>
      <p className="text-gray-400 mb-8">
        Convert any YouTube video to MP3 instantly
      </p>

      <div className="w-full max-w-xl flex flex-col gap-6">
        <UrlInput
          url={url}
          setUrl={setUrl}
          setVideoInfo={setVideoInfo}
          setStatus={setStatus}
        />

        {videoInfo && <VideoCard videoInfo={videoInfo} />}
        {/* 
        {videoInfo && (
          <QualitySelector quality={quality} setQuality={setQuality} />
        )} */}
        {videoInfo && (
          <QualitySelector
            url={url}
            quality={quality}
            setQuality={setQuality}
            setStatus={setStatus}
            setJobId={setJobId}
            setTitle={setTitle}
          />
        )}

        {status === "converting" && <ProgressBar />}

        {status === "done" && (
          <AudioPreview jobId={jobId} title={title} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}

export default App;
