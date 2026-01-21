import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dtbwsvacq',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

(async function () {
  try {
    const results = await cloudinary.uploader.upload('./images/mecanique_z1hsee.jpg');
    console.log('Image URL:', results.secure_url); // <-- C’est cette URL que tu peux utiliser
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
  }
})();


// https://res.cloudinary.com/dtbwsvacq/image/upload/v1753285063/mecanique_z1hsee.jpg
module.exports = cloudinary;