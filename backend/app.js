// app.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import your route modules
import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import themeRoutes from "./routes/themes.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";
import likesRoutes from "./routes/likes.js";

// Import your custom middleware
import { authenticateToken, verifyAdmin } from "./middleware/authMiddleware.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandlers.js";

const app = express();
const port = process.env.PORT || 3001; // ✅ Railway usa PORT dinámico

// ✅ CORS configurado para desarrollo Y producción
const allowedOrigins = [
  "http://localhost:3000", // Desarrollo local
  "http://localhost:3001", // Backend local
  process.env.FRONTEND_URL, // Tu URL de Vercel (variable de entorno)
  "https://microblogging-three.vercel.app", // Reemplaza con tu dominio real
  /https:\/\/.*\.vercel\.app$/,
];

// --- Global Middleware ---
app.use(express.json());
app.use(cookieParser());

// --- CORS Middleware (Global) ---
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some((allowedOrigin) => {
        if (allowedOrigin instanceof RegExp) return allowedOrigin.test(origin);
        return allowedOrigin === origin;
      });

      if (isAllowed) callback(null, true);
      else callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 86400,
  }),
);

// ✅ Health check para Railway/Vercel
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// --- API Routes ---
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/themes", themeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", authenticateToken, verifyAdmin, adminRoutes);
app.use("/api", uploadRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/posts", commentRoutes);

// Route racine
app.get("/", (req, res) => {
  res.json({
    message: "🌈 La vie est belle!",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

// ✅ Error Handling Middleware (MUST be placed LAST)
app.use(notFoundHandler);
app.use(errorHandler);

// Démarrage serveur
app.listen(port, "0.0.0.0", () => {
  // ✅ Escucha en todas las interfaces
  console.log(`🚀 Serveur lancé sur :${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
console.log(`📡 Allowed CORS origins: ${allowedOrigins.join(", ")}`);
});

export default app;
