// backend/src/routes/upload.js
import express from 'express';
import { upload, uploadToCloudinary } from '../middleware/upload.js';

const router = express.Router();

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }

    const result = await uploadToCloudinary(req.file.buffer);
    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
});

export default router;
