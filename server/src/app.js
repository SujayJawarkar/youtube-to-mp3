const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const converterRoutes = require("./routes/converter");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api", converterRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});
module.exports = app;
