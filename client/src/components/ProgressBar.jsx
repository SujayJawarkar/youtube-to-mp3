function ProgressBar() {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-sm text-gray-400 text-center">
        Converting... please wait
      </p>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div className="h-3 bg-red-500 rounded-full animate-pulse w-full" />
      </div>
    </div>
  );
}

export default ProgressBar;
