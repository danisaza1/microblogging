import './upload.js'; // si upload.js configure cloudinary.config(...)
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

const folderPath = path.join(process.cwd(), 'uploads');

async function uploadAll() {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'microblog',
      });
      console.log(`✅ Uploaded ${file}: ${result.secure_url}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${file}:`, error.message);
    }
  }
}

uploadAll();
