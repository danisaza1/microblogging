// routes/likes.js
import { Router } from 'express';
import prisma from '../lib/prismaClient.js'; // Adjust path as per your structure
import { optionalAuth, authenticateToken, verifyAdmin } from '../middleware/authMiddleware.js';

const router = Router();

// GET /:postId/likes (This will become /api/posts/:postId/likes)
router.get('/:postId/likes', optionalAuth, async (req, res) => {
  try {
    const { postId } = req.params;

    console.log(`📊 Backend: Fetching likes for post ${postId}`); // Added backend log

    // Count likes for the post
    const likesCount = await prisma.like.count({
      where: {
        postId: parseInt(postId)
      }
    });

    let likedByUser = false;

    // Only check if the user is authenticated (req.user is populated by optionalAuth)
    if (req.user?.id) {
      const userLike = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId: parseInt(req.user.id),
            postId: parseInt(postId)
          }
        }
      });
      likedByUser = !!userLike;
    }

    res.json({
      count: likesCount,
      likedByUser,
      postId: parseInt(postId)
    });

  } catch (error) {
    console.error('❌ Backend: Error getting likes:', error); // Added backend log
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudieron cargar los likes'
    });
  }
});

// POST /:postId/like (This will become /api/posts/:postId/like)
router.post('/:postId/like', authenticateToken, async (req, res) => { // Using authenticateToken as per your auth.js
  try {
    const { postId } = req.params;
    const userId = req.user.id; // req.user should be populated by authenticateToken

    console.log(`❤️ Backend: Toggle like: Post ${postId}, User ${userId}`); // Added backend log

    // Check if the like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: parseInt(userId),
          postId: parseInt(postId)
        }
      }
    });

    let liked = false;

    if (existingLike) {
      // ❌ Remove like
      await prisma.like.delete({
        where: {
          id: existingLike.id
        }
      });
      console.log(`💔 Backend: Like removed: Post ${postId}, User ${userId}`); // Added backend log
    } else {
      // ❤️ Add like
      await prisma.like.create({
        data: {
          userId: parseInt(userId),
          postId: parseInt(postId)
        }
      });
      liked = true;
      console.log(`💖 Backend: Like added: Post ${postId}, User ${userId}`); // Added backend log
    }

    // Get the updated like count
    const likesCount = await prisma.like.count({
      where: {
        postId: parseInt(postId)
      }
    });

    res.json({
      liked,
      count: likesCount,
      postId: parseInt(postId),
      userId: parseInt(userId)
    });

  } catch (error) {
    console.error('❌ Backend: Error in toggle like:', error); // Added backend log
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo procesar el like'
    });
  }
});

export default router;