// backend/controllers/likeController.js
import prisma from "../lib/prismaClient.js";

export const toggleLike = async (req, res) => {
  const userId = req.user?.id; // Asegúrate de tener auth middleware
  const { postId } = req.params;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const existing = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: parseInt(userId),
          postId: parseInt(postId),
        },
      },
    });

    if (existing) {
      await prisma.like.delete({
        where: { id: existing.id },
      });
      return res.json({ liked: false });
    } else {
      await prisma.like.create({
        data: {
          userId: parseInt(userId),
          postId: parseInt(postId),
        },
      });
      return res.json({ liked: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error toggling like" });
  }
};
