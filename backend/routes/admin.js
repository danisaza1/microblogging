import express from 'express';
import { authenticateToken, verifyAdmin } from '../middleware/authMiddleware.js';
import {
  getAdminDashboard,
  assignUserRole,
  getPendingPosts,
  approvePost,
  rejectPost
} from '../controllers/adminController.js';

const router = express.Router();

// Toutes les routes ici sont protégées par authentification + admin
router.use(authenticateToken, verifyAdmin);

// Dashboard
router.get('/dashboard', getAdminDashboard);

// Changement de rôle utilisateur
router.put('/assign-role', assignUserRole);

// Posts en attente
router.get('/pending-posts', getPendingPosts);

// Approuver un post
router.put('/posts/:id/approve', approvePost);

// Rejeter un post
router.put('/posts/:id/reject', rejectPost);

export default router;
