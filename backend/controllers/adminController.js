import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();


  // Middleware pour vérifier le rôle admin
 
export function checkAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Accès interdit' });
  }
  next();
}

  // Modifier le rôle d’un utilisateur

export const assignUserRole = async (req, res) => {
  const { userId, role } = req.body;

  if (!userId || !role) {
    return res.status(400).json({ error: "userId et role sont requis." });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    return res.status(200).json({ message: "Rôle mis à jour", user: updatedUser });
  } catch (error) {
    console.error("Erreur update rôle :", error);
    return res.status(500).json({ error: "Erreur serveur lors du changement de rôle." });
  }
};


// Stats du dashboard admin

export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const recentUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, email: true, role: true, createdAt: true },
    });

    return res.status(200).json({
      message: "Bienvenue sur le dashboard admin",
      stats: {
        totalUsers,
        recentUsers,
      },
    });
  } catch (error) {
    console.error("Erreur dashboard admin :", error);
    return res.status(500).json({ error: "Erreur serveur lors de la récupération du dashboard." });
  }
};


  // Récupérer les posts en attente

export const getPendingPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { status: 'pending' },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        user: {
          select: {
            prenom: true,
            nom: true
          }
        },
        theme: {
          select: {
            name: true
          }
        },
        category: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      description: post.description,
      createdAt: post.createdAt,
      authorName: `${post.user?.prenom || "?"} ${post.user?.nom || "?"}`,
      theme: post.theme?.name || "Inconnu",
      category: post.category?.name || "Inconnue"
    }));

    return res.status(200).json(formattedPosts);
  } catch (error) {
    console.error("Erreur récupération posts en attente :", error);
    return res.status(500).json({ error: "Erreur serveur lors de la récupération." });
  }
};


//  Approuver un post

export const approvePost = async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    await prisma.post.update({
      where: { id: postId },
      data: { status: "approved" },
    });

    return res.status(200).json({ message: "Post approuvé." });
  } catch (error) {
    console.error("Erreur approbation post :", error);
    return res.status(500).json({ error: "Erreur serveur lors de l'approbation." });
  }
};
  // Rejeter un post
export const rejectPost = async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    await prisma.post.update({
      where: { id: postId },
      data: { status: "rejected" },
    });

    return res.status(200).json({ message: "Post rejeté." });
  } catch (error) {
    console.error("Erreur rejet post :", error);
    return res.status(500).json({ error: "Erreur serveur lors du rejet." });
  }
};
