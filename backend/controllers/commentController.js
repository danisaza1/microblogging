import prisma from '../lib/prisma.js';

// GET /api/comments
export const getAllComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            include: {
                user: true,
                post: true,
            },
            orderBy: {createdAt: 'desc'},
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des commentaires'});
    }
};


// GET /api/comments/:id
export const getCommentById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const comment = await prisma.comment.findUnique({
            where: {id},
            include: {user: true, post: true},
        });
        if (!comment) return res.status(404).json({error: 'Commentaire non trouvé'});
        res.json(comment);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération'});
    }
};

// GET /api/posts/:postId/comments - Tous les commentaires d’un post
export const getCommentsByPost = async (req, res, next) => {
  console.log('[getCommentsByPost] Handler called for postId:', req.params.postId); // Add this log
  try {
    const postId = parseInt(req.params.postId);
    if (isNaN(postId)) {
      return res.status(400).json({ message: "ID de publication invalide" });
    }

    const comments = await prisma.comment.findMany({
      where: { postId: postId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            prenom: true, // Make sure these fields exist in your User model
            nom: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log('[getCommentsByPost] Comments fetched:', comments.length); // Add this log
    res.status(200).json(comments);
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires:', error);
    next(error); // Pass error to your error handler
  }
};


// POST /api/comments - Créer un commentaire
export const createComment = async (req, res) => {
  const postId = parseInt(req.params.postId);
  const { userId, content } = req.body;

  if (isNaN(postId)) {
    return res.status(400).json({ error: "PostId invalide" });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        user: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
    });

    const commentWithUser = await prisma.comment.findUnique({
      where: { id: newComment.id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            prenom: true,
            nom: true,
          },
        },
      },
    });

    res.status(201).json(commentWithUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erreur lors de la création du commentaire' });
  }
};



// PUT /api/comments/:id - Modifier un commentaire
export const updateComment = async (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content },
    });
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour du commentaire' });
  }
};

// DELETE /api/comments/:id - Supprimer un commentaire
export const deleteComment = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.comment.delete({ where: { id } });
    res.json({ message: 'Commentaire supprimé' });
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la suppression du commentaire' });
  }
};