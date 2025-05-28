import express from "express";
const app = express();
import dotenv from "dotenv";
import dbConnect from "./db/connect.js";
import config from "./config/config.js";
import router from "./routes/index.js";
dotenv.config();

dbConnect();
const PORT = config.port;
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use('/api',router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});
