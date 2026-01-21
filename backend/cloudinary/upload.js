
import { v2 as cloudinary } from 'cloudinary';

import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagePath = path.join(process.cwd(), 'uploads', 'ton-image.jpg'); // remplace le nom de fichier ici

cloudinary.uploader.upload(imagePath, {
  folder: 'microblog', // tu peux changer le nom du dossier distant
})
.then(result => {
  console.log('Image uploadée ! URL :', result.secure_url);
})
.catch(error => {
  console.error('Erreur upload :', error);
});
