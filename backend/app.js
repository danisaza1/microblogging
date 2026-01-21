// app.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Assuming you have prisma here for other parts of your app
// import prisma from './lib/prisma.js';

// Import your route modules
import postsRoutes from './routes/posts.js';
import usersRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js'; // Your comments router
import themeRoutes from './routes/themes.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import uploadRoutes from './routes/upload.js';
import likesRoutes from './routes/likes.js'; // Assuming you have this also

// Import your custom middleware
import { authenticateToken, verifyAdmin, optionalAuth } from './middleware/authMiddleware.js'; // Ensure authenticateToken and optionalAuth are imported
import { notFoundHandler, errorHandler } from './middleware/errorHandlers.js'; // Your error handlers

const app = express();
const port = 3001;

// --- Global Middleware ---
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// --- API Routes ---
app.use('/api/posts', postsRoutes);
console.log('[Backend Init] Posts routes mounted at /api/posts'); // Add this log


app.use('/api/users', usersRoutes);

// ✅ Mount commentsRoutes for GENERIC /api/comments/... routes
// (e.g., /api/comments for all comments, /api/comments/:id for a single comment)
app.use('/api/comments', commentRoutes);
console.log('[Backend Init] Comments routes mounted at /api/posts (for post-specific comments)'); // Add this log


app.use('/api/themes', themeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', authenticateToken, verifyAdmin, adminRoutes);
app.use('/api', uploadRoutes); // Adjust this path if upload is more specific (e.g., /api/upload)
app.use('/api/posts', likesRoutes); // Keep your likes routes mounted correctly

// ✅ CRITICAL FIX: Mount commentsRoutes AGAIN for POST-SPECIFIC /api/posts/:postId/comments routes
// This allows the router.get('/:postId/comments') and router.post('/:postId/comments')
// defined WITHIN commentsRoutes to be accessible via the /api/posts prefix.
app.use('/api/posts', commentRoutes);


// Route racine
app.get('/', (req, res) => {
  res.send('🌈 La vie est belle!');
});

// ✅ Error Handling Middleware (MUST be placed LAST)
app.use(notFoundHandler); // Handles 404 Not Found errors
app.use(errorHandler);    // Catches all other errors

// Démarrage serveur
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur : http://localhost:${port}`);
  console.log(`📡 Routes de commentaires disponibles:`);
  console.log(`    - GET  /api/comments`);
  console.log(`    - GET  /api/comments/:id`);
  console.log(`    - GET  /api/posts/:postId/comments`); // Highlight the correct path for post comments
  console.log(`    - POST /api/posts/:postId/comments`); // Highlight the correct path for post comments
  console.log(`    - PUT  /api/comments/:id`);
  console.log(`    - DELETE /api/comments/:id`);
  // And your likes routes if you want to keep them here for visibility
  console.log(`📡 Routes de likes disponibles:`);
  console.log(`    - GET  /api/posts/:postId/likes`);
  console.log(`    - POST /api/posts/:postId/like`);
});

export default app;