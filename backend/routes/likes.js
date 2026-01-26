// routes/likes.js
import { Router } from 'express';
import prisma from '../lib/prismaClient.js';
import { optionalAuth, authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

console.log('🔥 Likes router LOADED');

/**
 * GET likes of a post
 * GET /api/likes/posts/:postId
 */
router.get('/posts/:postId', optionalAuth, async (req, res) => {
  try {
    const postId = Number(req.params.postId);

    console.log(`📊 Fetching likes for post ${postId}`);

    const count = await prisma.like.count({
      where: { postId }
    });

    let likedByUser = false;

    if (req.user?.id) {
      const existingLike = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId: Number(req.user.id),
            postId
          }
        }
      });

      likedByUser = Boolean(existingLike);
    }

    res.json({
      postId,
      count,
      likedByUser
    });
  } catch (error) {
    console.error('❌ Error fetching likes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/**
 * TOGGLE like
 * POST /api/likes/posts/:postId
 */
router.post('/posts/:postId', authenticateToken, async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    const userId = Number(req.user.id);

    console.log(`❤️ Toggle like | post=${postId} user=${userId}`);

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    });

    let liked;

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      liked = false;
      console.log('💔 Like removed');
    } else {
      await prisma.like.create({
        data: { userId, postId }
      });
      liked = true;
      console.log('💖 Like added');
    }

    const count = await prisma.like.count({
      where: { postId }
    });

    res.json({
      postId,
      userId,
      liked,
      count
    });
  } catch (error) {
    console.error('❌ Error toggling like:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
