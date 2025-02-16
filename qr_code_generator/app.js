import express from "express";
import qr from "qr-image";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use(express.static("public"));

app.post("/generate", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const qrPath = "public/generated/qrcode.png";
  if (!fs.existsSync("public/generated")) fs.mkdirSync("public/generated", { recursive: true });

  const qr_svg = qr.image(url, { type: "png" });
  const stream = fs.createWriteStream(qrPath);

  qr_svg.pipe(stream);

  stream.on("finish", () => {
    res.json({ qrCodeUrl: "/generated/qrcode.png" });
  });

  stream.on("error", (err) => {
    console.error("Stream Error:", err);
    res.status(500).json({ error: "Failed to generate QR code" });
  });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
