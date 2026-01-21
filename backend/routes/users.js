import { authenticateToken } from '../middleware/authMiddleware.js';

import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
