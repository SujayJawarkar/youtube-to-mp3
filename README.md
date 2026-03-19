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
- 🎚️ Choose audio quality — **128 kbps**
- ⏳ Progress indicator during conversion
- 🎧 **Audio preview** before downloading
- ⬇️ Download MP3 named after the video title
- 🔄 Convert multiple videos in one session
- 📱 Fully responsive UI

---

## 🛠️ Tech Stack

### Frontend

| Tech            | Purpose                   |
| --------------- | ------------------------- |
| React 18 + Vite | UI framework & build tool |
| Tailwind CSS    | Styling                   |
| Axios           | HTTP requests             |
| React Hot Toast | Notifications             |

### Backend

| Tech                    | Purpose                         |
| ----------------------- | ------------------------------- |
| Node.js + Express       | REST API server                 |
| YouTube Data API v3     | Fetch video metadata            |
| RapidAPI (youtube-mp36) | MP3 conversion & download       |
| uuid                    | Unique job IDs for temp files   |
| cors                    | Cross-origin request handling   |
| dotenv                  | Environment variable management |

---

## 📁 Project Structure

```
youtube-to-mp3/
├── client/                         # Vite + React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── UrlInput.jsx            # URL input & fetch
│   │   │   ├── VideoCard.jsx           # Thumbnail, title, duration
│   │   │   ├── QualitySelector.jsx     # Quality picker + convert button
│   │   │   ├── ProgressBar.jsx         # Conversion progress
│   │   │   └── AudioPreview.jsx        # Audio player + download
│   │   └── App.jsx                     # Main state manager
│   └── .env                            # VITE_API_URL
│
└── server/                         # Node.js + Express backend
    ├── src/
    │   ├── routes/
    │   │   └── converter.js            # /info /convert /stream /download
    │   ├── utils/
    │   │   ├── youtube.js              # YouTube Data API v3 wrapper
    │   │   └── rapidapi.js             # RapidAPI MP3 downloader
    │   └── app.js                      # Express app setup
    ├── temp/                           # Temporary MP3 storage (gitignored)
    ├── build.sh                        # Render build script
    ├── .env                            # API keys (gitignored)
    └── server.js                       # Entry point
```

---

## 🚀 Running Locally

### Prerequisites

- Node.js 18+
- Git
- YouTube Data API v3 key
- RapidAPI key (youtube-mp36)

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

Create a `.env` file inside `server/`:

```
YOUTUBE_API_KEY=your_youtube_data_api_key
RAPIDAPI_KEY=your_rapidapi_key
```

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

## 🔑 API Keys Setup

### YouTube Data API v3

1. Go to 👉 https://console.cloud.google.com
2. Create a new project
3. Go to **APIs & Services → Library**
4. Search **"YouTube Data API v3"** and enable it
5. Go to **APIs & Services → Credentials → Create Credentials → API Key**
6. Copy the key and add it to your `.env`

### RapidAPI (youtube-mp36)

1. Go to 👉 https://rapidapi.com
2. Search for **"youtube-mp36"** by `ytjar`
3. Subscribe to the free plan
4. Go to **Endpoints** tab and copy your **X-RapidAPI-Key**
5. Add it to your `.env`

---

## 🔌 API Endpoints

| Method | Endpoint               | Description                            |
| ------ | ---------------------- | -------------------------------------- |
| `POST` | `/api/info`            | Fetch video title, thumbnail, duration |
| `POST` | `/api/convert`         | Download & convert audio to MP3        |
| `GET`  | `/api/stream/:jobId`   | Stream MP3 for audio preview           |
| `GET`  | `/api/download/:jobId` | Download MP3 file                      |

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

| Service  | Platform                     |
| -------- | ---------------------------- |
| Frontend | [Vercel](https://vercel.com) |
| Backend  | [Render](https://render.com) |

### Environment Variables

**Vercel (Frontend):**

```
VITE_API_URL=https://your-render-app.onrender.com/api
```

**Render (Backend):**

```
NODE_ENV=production
YOUTUBE_API_KEY=your_youtube_data_api_key
RAPIDAPI_KEY=your_rapidapi_key
```

### Render Build Configuration

```
Root Directory : server
Build Command  : chmod +x build.sh && ./build.sh && npm install
Start Command  : npm start
```

---

## 🔁 How It Works

```
User pastes YouTube URL
        ↓
Frontend calls POST /api/info
        ↓
Backend fetches metadata via YouTube Data API v3
        ↓
Frontend displays title, thumbnail, duration
        ↓
User selects quality and clicks Convert
        ↓
Frontend calls POST /api/convert
        ↓
Backend requests MP3 link from RapidAPI (youtube-mp36)
        ↓
RapidAPI returns status: processing → polls every 1 second
        ↓
RapidAPI returns status: ok → MP3 link received
        ↓
Backend downloads MP3 and saves to temp/
        ↓
Frontend shows audio preview player
        ↓
User clicks Download → MP3 saved as video title
        ↓
Temp file deleted from server
```

---

## ⚠️ Known Limitations

- **128 kbps only** — The RapidAPI free tier only supports 128 kbps audio quality
- **RapidAPI Free Tier** — Limited to 500 requests/month
- **YouTube Data API** — 10,000 units/day on free tier (each fetch costs ~3 units)
- **Render Free Tier** — Backend spins down after 15 minutes of inactivity, first request may take 30–60 seconds
- **Temporary Files** — Converted MP3s are stored temporarily on the server and deleted immediately after download
- **Legal Notice** — This project is intended for personal and educational use only. Downloading copyrighted content may violate YouTube's Terms of Service

---

## 🧠 What I Learned

- Building a full-stack app with **React + Vite** on the frontend and **Node.js + Express** on the backend
- Integrating third party APIs (**YouTube Data API v3** and **RapidAPI**)
- Handling **file streaming** and **range requests** for audio playback in the browser
- Managing **temporary files** and cleanup logic on the server
- Implementing **polling** to handle asynchronous API responses
- Deploying a full-stack app across **Vercel + Render**
- Solving real-world deployment issues like **CORS**, **bot detection**, and **binary installation on Linux**
- Writing clean, modular backend code with separated **utils** and **routes**

---

## 🚀 Future Improvements

- [ ] Download history — show previously converted songs
- [ ] Playlist support — convert entire YouTube playlists
- [ ] Dark / Light mode toggle
- [ ] Higher quality audio via premium API plan
- [ ] Progress percentage instead of loading animation

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Sujay Jawarkar**

- GitHub: [@SujayJawarkar](https://github.com/SujayJawarkar)
