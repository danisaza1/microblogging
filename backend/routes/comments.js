// routes/comments.js
import express from 'express';
import {
  getAllComments,
  getCommentById,
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';

// IMPORTANT: Ensure authenticateToken and optionalAuth are correctly imported
import { authenticateToken, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Routes that will primarily be accessed via /api/comments ---
// (When app.use('/api/comments', commentRoutes) is used in app.js)
router.get('/', optionalAuth, getAllComments);         // Becomes GET /api/comments
router.get('/:id', optionalAuth, getCommentById);       // Becomes GET /api/comments/:id
router.put('/:id', authenticateToken, updateComment);   // Becomes PUT /api/comments/:id
router.delete('/:id', authenticateToken, deleteComment); // Becomes DELETE /api/comments/:id


// --- Routes that will primarily be accessed via /api/posts ---
// (When app.use('/api/posts', commentRoutes) is used in app.js)
// ✅ FIX: This route now directly matches frontend's GET /api/posts/:postId/comments
router.get('/:postId/comments', optionalAuth, getCommentsByPost);
console.log('[Comments Router] Defined GET /:postId/comments'); // Add this log

// ✅ FIX: This route now directly matches frontend's POST /api/posts/:postId/comments
router.post('/:postId/comments', authenticateToken, createComment);
console.log('[Comments Router] Defined POST /:postId/comments'); // Add this log

export default router;