function VideoCard({ videoInfo }) {
  const { title, thumbnail, duration } = videoInfo;

  return (
    <div className="flex gap-4 bg-gray-700 rounded-xl p-4 items-center">
      <img
        src={thumbnail}
        alt={title}
        className="w-32 h-20 object-cover rounded-lg"
      />
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-white line-clamp-2">{title}</p>
        <p className="text-sm text-gray-400">Duration: {duration}</p>
      </div>
    </div>
  );
}

export default VideoCard;
