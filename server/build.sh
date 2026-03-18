#!/bin/bash

# Create bin directory
mkdir -p bin

# Download yt-dlp binary
echo "Downloading yt-dlp..."
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o bin/yt-dlp
chmod a+rx bin/yt-dlp
echo "yt-dlp downloaded!"

# Download ffmpeg binary
echo "Downloading ffmpeg..."
curl -L https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz -o bin/ffmpeg.tar.xz
tar -xf bin/ffmpeg.tar.xz -C bin/ --strip-components=1
chmod a+rx bin/ffmpeg
rm bin/ffmpeg.tar.xz
echo "ffmpeg downloaded!"