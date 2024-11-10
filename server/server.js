const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle image upload and OCR processing
app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const buffer = req.file.buffer;

    // Use Tesseract to extract text from the uploaded image
    const { data: { text } } = await Tesseract.recognize(buffer, 'eng');
    res.json({ text });
  } catch (error) {
    console.error('OCR error:', error);
    res.status(500).json({ message: 'Failed to process image' });
  }
});

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
