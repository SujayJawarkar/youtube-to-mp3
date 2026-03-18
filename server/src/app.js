const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const converterRoutes = require("./routes/converter");
const app = express();

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://youtube-to-mp3-4k0i.onrender.com", // production
];

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
app.use(morgan("dev"));
app.use("/api", converterRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});
module.exports = app;
