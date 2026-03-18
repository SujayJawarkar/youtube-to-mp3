# 🎵 YouTube to MP3 Converter

A full-stack web application that converts YouTube videos to MP3 files with audio preview, quality selection, and direct download — built with React, Vite, Node.js, and Express.

---

## 🌐 Live Demo

- **Frontend:** [youtube-to-mp3-rose.vercel.app](https://youtube-to-mp3-rose.vercel.app)
- **Backend:** [youtube-to-mp3-4k0i.onrender.com](https://youtube-to-mp3-4k0i.onrender.com)

> ⚠️ The backend is hosted on Render's free tier and may take 30–60 seconds to wake up on the first request after a period of inactivity.

---

## ✨ Features

- 🔗 Paste any YouTube URL and fetch video metadata instantly
- 🖼️ Displays video **title**, **thumbnail**, and **duration**
- 🎚️ Choose audio quality — **128 kbps** or **320 kbps**
- ⏳ Progress indicator during conversion
- 🎧 **Audio preview** before downloading
- ⬇️ Download MP3 named after the video title
- 🔄 Convert multiple videos in one session
- 📱 Fully responsive UI

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 18 + Vite | UI framework & build tool |
| Tailwind CSS | Styling |
| Axios | HTTP requests |
| React Hot Toast | Notifications |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express | REST API server |
| yt-dlp | YouTube audio extraction |
| fluent-ffmpeg | Audio conversion to MP3 |
| uuid | Unique job IDs for temp files |
| cors | Cross-origin request handling |

---

## 📁 Project Structure

```
youtube-to-mp3/
├── client/                     # Vite + React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── UrlInput.jsx        # URL input & fetch
│   │   │   ├── VideoCard.jsx       # Thumbnail, title, duration
│   │   │   ├── QualitySelector.jsx # 128/320kbps + convert button
│   │   │   ├── ProgressBar.jsx     # Conversion progress
│   │   │   └── AudioPreview.jsx    # Audio player + download
│   │   └── App.jsx                 # Main state manager
│   └── .env                        # VITE_API_URL
│
└── server/                     # Node.js + Express backend
    ├── src/
    │   ├── routes/
    │   │   └── converter.js        # /info /convert /stream /download
    │   ├── utils/
    │   │   ├── ytdlp.js            # yt-dlp wrapper
    │   │   └── ffmpeg.js           # ffmpeg conversion
    │   └── app.js                  # Express app setup
    ├── bin/                        # yt-dlp & ffmpeg binaries (gitignored)
    ├── temp/                       # Temporary MP3 storage (gitignored)
    ├── build.sh                    # Render build script
    └── server.js                   # Entry point
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+
- Git

### 1. Clone the repository

```bash
git clone https://github.com/SujayJawarkar/youtube-to-mp3.git
cd youtube-to-mp3
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Download the required binaries and place them in `server/bin/`:

- **yt-dlp.exe** → [github.com/yt-dlp/yt-dlp/releases](https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe)
- **ffmpeg.exe** → [gyan.dev/ffmpeg/builds](https://www.gyan.dev/ffmpeg/builds/) (download `ffmpeg-release-full.7z`, extract and grab `ffmpeg.exe`)

Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### 3. Setup the Frontend

```bash
cd client
npm install
```

Create a `.env` file inside `client/`:
```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/info` | Fetch video title, thumbnail, duration |
| `POST` | `/api/convert` | Download & convert audio to MP3 |
| `GET` | `/api/stream/:jobId` | Stream MP3 for audio preview |
| `GET` | `/api/download/:jobId` | Download MP3 file |

### Example Request — `/api/info`

```json
POST /api/info
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

### Example Response

```json
{
  "title": "Rick Astley - Never Gonna Give You Up",
  "thumbnail": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  "duration": "3:33",
  "videoId": "dQw4w9WgXcQ"
}
```

---

## ☁️ Deployment

| Service | Platform |
|---|---|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |

### Environment Variables

**Vercel (Frontend):**
```
VITE_API_URL=https://your-render-app.onrender.com/api
```

**Render (Backend):**
```
NODE_ENV=production
YOUTUBE_COOKIES=<contents of cookies.txt>
```

### Render Build Configuration
```
Root Directory : server
Build Command  : chmod +x build.sh && ./build.sh && npm install
Start Command  : npm start
```

---

## ⚠️ Known Limitations

- **YouTube Bot Detection** — YouTube may block requests from server IPs. A `cookies.txt` workaround is used for authentication on the deployed server. Cookies may need to be refreshed periodically.
- **Render Free Tier** — The backend spins down after 15 minutes of inactivity. The first request may take 30–60 seconds.
- **Temporary Files** — Converted MP3s are stored temporarily on the server and deleted immediately after download.
- **Legal Notice** — This project is intended for personal and educational use only. Downloading copyrighted content may violate YouTube's Terms of Service.

---

## 🧠 What I Learned

- Building a full-stack app with **React + Vite** on the frontend and **Node.js + Express** on the backend
- Working with system binaries (`yt-dlp`, `ffmpeg`) inside a Node.js environment
- Handling **file streaming** and **range requests** for audio playback in the browser
- Managing **temporary files** and cleanup logic on the server
- Deploying a full-stack app across **Vercel + Render**
- Solving real-world deployment issues like **CORS**, **bot detection**, and **binary installation on Linux**

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Sujay Jawarkar**
- GitHub: [@SujayJawarkar](https://github.com/SujayJawarkar)
