/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000", // Desarrollo local
    "http://localhost:3001", // Backend local
    process.env.FRONTEND_URL, // Tu URL de Vercel (variable de entorno)
    "https://microblogging-three.vercel.app", // Reemplaza con tu dominio real
    /https:\/\/.*\.vercel\.app$/,
  ],
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "unsplash.com",
      "via.placeholder.com",
      "media.istockphoto.com",
    ],
  },
};

export default nextConfig;
