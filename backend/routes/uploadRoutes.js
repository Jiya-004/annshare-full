const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// POST /api/upload - handles Base64 data URL or raw image payload
router.post('/', async (req, res) => {
  try {
    const { image, name } = req.body;

    if (!image) {
      return res.status(400).json({ message: 'No image data provided' });
    }

    // If it is a full URL (e.g. Unsplash or Cloudinary), return it directly
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return res.status(200).json({ url: image, path: image });
    }

    // Parse base64 data URL (e.g., "data:image/png;base64,iVBORw...")
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
    let buffer;
    let ext = 'jpg';

    if (matches && matches.length === 3) {
      const mimeType = matches[1];
      ext = mimeType.split('/')[1] || 'jpg';
      if (ext === 'jpeg') ext = 'jpg';
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      // Raw base64 string
      buffer = Buffer.from(image, 'base64');
    }

    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileName = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    fs.writeFileSync(filePath, buffer);

    const host = req.get('host') || 'localhost:8000';
    const protocol = req.protocol || 'http';
    const fileUrl = `${protocol}://${host}/uploads/${fileName}`;

    res.status(201).json({
      success: true,
      fileName,
      url: fileUrl,
      path: `/uploads/${fileName}`,
    });
  } catch (err) {
    console.error('Image Upload Error:', err);
    res.status(500).json({ message: 'Failed to process image upload: ' + err.message });
  }
});

module.exports = router;
