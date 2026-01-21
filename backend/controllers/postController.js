import prisma from '../lib/prisma.js';
import { uploadToCloudinary } from '../middleware/upload.js';

// Formatage pour le frontend
const formatPostForFrontend = (post) => {
  if (!post) return null;
  const authorName = post.user
    ? `${post.user.prenom} ${post.user.nom}`
    : "Anonymous";
  const categoryName = post.category ? post.category.name : "Unknown";
  const themeName = post.theme ? post.theme.name : "Unknown";

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.description,
    content: post.content,
    imageUrl: post.imageUrl,
    altText: post.altText,
    authorName,
    categoryName,
    theme: themeName,
    createdAt: post.createdAt,
  };
};

// GET /api/posts?theme=Culture
export const getAllPosts = async (req, res) => {
  const { theme } = req.query;
  try {
const whereClause = theme
  ? { theme: { name: { contains: theme, mode: "insensitive" } } }
  : {};    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        user: { select: { prenom: true, nom: true } },
        category: { select: { name: true } },
        theme: { select: { name: true } },
        comments: true,
        likes: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedPosts = posts.map(formatPostForFrontend);
    res.status(200).json(formattedPosts);
  } catch (error) {
    console.error('Erreur getAllPosts :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des posts' });
  }
};

// GET /api/posts/:id
export const getPostById = async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: { select: { prenom: true, nom: true } },
        category: { select: { name: true } },
        theme: { select: { name: true } },
        comments: { include: { user: { select: { username: true } } }, orderBy: { createdAt: 'asc' } },
        likes: { select: { userId: true } },
      },
    });
    if (!post) return res.status(404).json({ error: 'Post non trouvé' });
    res.status(200).json(formatPostForFrontend(post));
  } catch (error) {
    console.error('Erreur getPostById :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du post' });
  }
};

// POST /api/posts
export const createPost = async (req, res) => {
  try {
    const {
      userId,
      themeId,
      categoryName,
      title,
      description,
      altText,
      slug,
      content,
      imageUrl: bodyImageUrl
    } = req.body;

    if (!themeId || !categoryName || !title || !content) {
      return res.status(400).json({ error: "Champs obligatoires manquants." });
    }

    const themeIdInt = parseInt(themeId);
    if (isNaN(themeIdInt)) {
      return res.status(400).json({ error: "themeId doit être un nombre valide." });
    }

    // Générer slug si non fourni
    const postSlug = slug || title.toLowerCase().replace(/\s+/g, '-');

    // Upload image si fourni
    let imageUrl = bodyImageUrl || "";
    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = cloudinaryResult.secure_url;
    }

    // Vérifier que le thème existe
    const themeExists = await prisma.theme.findUnique({ where: { id: themeIdInt } });
    if (!themeExists) return res.status(400).json({ error: "Le thème sélectionné n'existe pas." });

    // Chercher ou créer la catégorie
    let category = await prisma.category.findUnique({
      where: { name_themeId: { name: categoryName, themeId: themeIdInt } },
    });

    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName, themeId: themeIdInt },
      });
    }

    // Créer le post
    const newPost = await prisma.post.create({
      data: {
        userId: userId || null,
        themeId: themeIdInt,
        categoryId: category.id,
        title,
        description: description || title.slice(0, 150),
        content,
        slug: postSlug,
        imageUrl,
        altText: altText || "",
      },
      include: {
        user: { select: { prenom: true, nom: true } },
        theme: { select: { name: true } },
        category: { select: { name: true } },
      }
    });

    res.status(201).json(formatPostForFrontend(newPost));
  } catch (error) {
    console.error('Erreur createPost :', error);

    if (error.code === 'P2002') {
      return res.status(409).json({ error: "Un article avec ce slug existe déjà." });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ error: "Le thème ou la catégorie sélectionné(e) n'existe pas." });
    }

    res.status(500).json({ error: 'Erreur interne lors de la création du post.', details: error.message });
  }
};

// PUT /api/posts/:id
export const updatePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const {
      themeId,
      categoryName,
      title,
      description,
      content,
      altText,
      slug,
      imageUrl: bodyImageUrl
    } = req.body;

    if (!themeId || !categoryName || !title || !description || !slug || !content) {
      return res.status(400).json({ error: "Champs obligatoires manquants." });
    }

    const themeIdInt = parseInt(themeId);
    if (isNaN(themeIdInt)) {
      return res.status(400).json({ error: "themeId doit être un nombre valide." });
    }

    let imageUrl = bodyImageUrl || "";
    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = cloudinaryResult.secure_url;
    }

    // Chercher ou créer la catégorie
    let category = await prisma.category.findUnique({
      where: { name_themeId: { name: categoryName, themeId: themeIdInt } },
    });

    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName, themeId: themeIdInt },
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        themeId: themeIdInt,
        categoryId: category.id,
        title,
        description,
        content,
        slug,
        altText: altText || "",
        imageUrl,
      },
      include: {
        user: { select: { prenom: true, nom: true } },
        theme: { select: { name: true } },
        category: { select: { name: true } },
      }
    });

    res.status(200).json(formatPostForFrontend(updatedPost));
  } catch (error) {
    console.error('Erreur updatePost :', error);
    res.status(400).json({ error: 'Erreur lors de la modification du post.' });
  }
};

// DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    await prisma.post.delete({ where: { id: postId } });
    res.status(204).send();
  } catch (error) {
    console.error('Erreur deletePost :', error);
    res.status(400).json({ error: 'Erreur lors de la suppression du post' });
  }
};
