// backend/middleware/upload.js

import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary'; // Still need to import cloudinary here to use its uploader

// Configurar multer para mantener archivos en memoria
const storage = multer.memoryStorage();

// Export the 'upload' middleware so other files can import it
export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB límite
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes'), false);
        }
    }
});

// Export the 'uploadToCloudinary' function so other files can import it
export const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                folder: 'microblogging/posts', // Organize into folders on Cloudinary
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        ).end(buffer);
    });
};