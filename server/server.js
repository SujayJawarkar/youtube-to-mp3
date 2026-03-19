require("dotenv").config();
const app = require("./src/app");
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at youtube-to-mp3-4k0i.onrender.com`);
});
