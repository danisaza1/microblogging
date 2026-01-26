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
import {
  authenticateToken,
  verifyAdmin,
  optionalAuth,
} from "./middleware/authMiddleware.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandlers.js";

const app = express();
const port = process.env.PORT || 3001; // ✅ Railway usa PORT dinámico

// --- Global Middleware ---
app.use(express.json());
app.use(cookieParser());

// ✅ CORS configurado para desarrollo Y producción
const allowedOrigins = [
  "http://localhost:3000", // Desarrollo local
  "http://localhost:3001", // Backend local
  process.env.FRONTEND_URL, // Tu URL de Vercel (variable de entorno)
  "https://microblogging-three.vercel.app", // Reemplaza con tu dominio real
  /https:\/\/.*\.vercel\.app$/,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permite requests sin origin (como Postman, curl, o mobile apps)
      if (!origin) return callback(null, true);

      // Verifica si el origin está en la lista permitida
      const isAllowed = allowedOrigins.some((allowedOrigin) => {
        if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return allowedOrigin === origin;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`⚠️  CORS blocked origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Permite cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 86400, // Cache preflight por 24 horas
  }),
);

// ✅ Health check para Railway/Vercel
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// --- API Routes ---
app.use("/api/posts", postsRoutes);
console.log("[Backend Init] Posts routes mounted at /api/posts");

app.use("/api/users", usersRoutes);

// ✅ Mount commentsRoutes for GENERIC /api/comments/... routes
app.use("/api/comments", commentRoutes);
console.log("[Backend Init] Comments routes mounted at /api/comments");

app.use("/api/themes", themeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", authenticateToken, verifyAdmin, adminRoutes);
app.use("/api", uploadRoutes);
app.use("/api/likes", likesRoutes);

// ✅ Mount commentsRoutes AGAIN for POST-SPECIFIC /api/posts/:postId/comments routes
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
  console.log(`🚀 Serveur lancé sur : http://localhost:${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📡 Routes de commentaires disponibles:`);
  console.log(`    - GET  /api/comments`);
  console.log(`    - GET  /api/comments/:id`);
  console.log(`    - GET  /api/posts/:postId/comments`);
  console.log(`    - POST /api/posts/:postId/comments`);
  console.log(`    - PUT  /api/comments/:id`);
  console.log(`    - DELETE /api/comments/:id`);
  console.log(`📡 Routes de likes disponibles:`);
  console.log(`    - GET  /api/posts/:postId/likes`);
  console.log(`    - POST /api/posts/:postId/like`);
});

export default app;
