import express from "express";
import prisma from "../lib/prisma.js";
import { toggleLike } from "../controllers/likeController.js";
import { upload, uploadToCloudinary } from "../middleware/upload.js";

const router = express.Router();

// ---------------------------
// Helper pour formater un post
// ---------------------------
const formatPostForFrontend = (post) => {
  if (!post) return null;
  return {
    id: post.id,
    slug: post.slug,
    imageUrl: post.imageUrl,
    altText: post.altText,
    categoryName: post.category?.name || "Unknown",
    title: post.title,
    description: post.description,
    content: post.content,
    authorName: post.user
      ? `${post.user.prenom} ${post.user.nom}`
      : "Anonymous",
    theme: post.theme?.name || "Unknown",
  };
};

// ---------------------------
// Helper pour créer slug sécurisé
// ---------------------------
const slugify = (text) => {
  return text
    .toString()
    .normalize("NFD") // Décomposer les accents
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-") // Remplacer & par "and"
    .replace(/[\s\W-]+/g, "-"); // Remplacer tout ce qui n’est pas alphanumérique par des tirets
};

// ---------------------------
// Helper pour récupérer ou créer une catégorie
// ---------------------------
const findOrCreateCategory = async (categoryName, themeId) => {
  let category = await prisma.category.findUnique({
    where: { name_themeId: { name: categoryName, themeId } },
  });

  if (!category) {
    category = await prisma.category.create({
      data: { name: categoryName, themeId },
    });
  }
  return category;
};

// ---------------------------
// GET /api/posts/top-posts
// ---------------------------
router.get("/top-posts", async (req, res) => {
  const { theme } = req.query;
  try {
    const whereClause = theme
      ? { theme: { name: { contains: theme, mode: "insensitive" } } }
      : {};
    const posts = await prisma.post.findMany({
      where: whereClause,
      include: { user: true, theme: true, category: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
    res.json(posts.map(formatPostForFrontend));
  } catch (error) {
    console.error("Erreur top posts:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des top posts." });
  }
});

// ---------------------------
// GET /api/posts
// ---------------------------
router.get("/", async (req, res) => {
  const { theme } = req.query;
  try {
    const whereClause = theme
      ? { theme: { name: { contains: theme, mode: "insensitive" } } }
      : {};
    const posts = await prisma.post.findMany({
      where: whereClause,
      include: { user: true, theme: true, category: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(posts.map(formatPostForFrontend));
  } catch (error) {
    console.error("Erreur posts:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des posts." });
  }
});

// ---------------------------
// GET /api/posts/:slug
// ---------------------------
router.get("/:slug", async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug },
      include: {
        user: true,
        theme: true,
        category: true,
        comments: { include: { user: true }, orderBy: { createdAt: "asc" } },
        likes: true,
      },
    });
    if (!post) return res.status(404).json({ error: "Post non trouvé." });
    res.json(formatPostForFrontend(post));
  } catch (error) {
    console.error("Erreur post par slug:", error);
    res.status(500).json({ error: "Erreur lors de la récupération du post." });
  }
});

// ---------------------------
// POST /api/posts
// ---------------------------
router.post("/", upload.single("image"), async (req, res) => {
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
    } = req.body;

    if (!themeId || !categoryName || !title || !content) {
      return res.status(400).json({ error: "Champs obligatoires manquants." });
    }

    const themeIdInt = parseInt(themeId);
    if (isNaN(themeIdInt))
      return res.status(400).json({ error: "themeId doit être un nombre." });

    const themeExists = await prisma.theme.findUnique({
      where: { id: themeIdInt },
    });
    if (!themeExists)
      return res
        .status(400)
        .json({ error: "Le thème sélectionné n'existe pas." });

    const postSlug = slug ? slugify(slug) : slugify(title);

    let imageUrl = req.body.imageUrl || "";
    if (req.file) {
      const cloudResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = cloudResult.secure_url;
    }

    const category = await findOrCreateCategory(categoryName, themeIdInt);

    const newPost = await prisma.post.create({
      data: {
        userId: userId || null,
        themeId: themeIdInt,
        categoryId: category.id,
        title,
        description: description || title.slice(0, 150),
        content,
        imageUrl,
        altText: altText || "",
        slug: postSlug,
      },
      include: { user: true, theme: true, category: true },
    });

    res.status(201).json(formatPostForFrontend(newPost));
  } catch (error) {
    console.error("Erreur création post:", error);
    if (error.code === "P2002")
      return res.status(409).json({ error: "Slug déjà existant." });
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// ---------------------------
// PUT /api/posts/:id
// ---------------------------
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const {
      themeId,
      categoryName,
      title,
      description,
      altText,
      slug,
      content,
    } = req.body;

    if (
      !themeId ||
      !categoryName ||
      !title ||
      !description ||
      !slug ||
      !content
    ) {
      return res.status(400).json({ error: "Champs obligatoires manquants." });
    }

    const themeIdInt = parseInt(themeId);
    const themeExists = await prisma.theme.findUnique({
      where: { id: themeIdInt },
    });
    if (!themeExists)
      return res
        .status(400)
        .json({ error: "Le thème sélectionné n'existe pas." });

    let imageUrl = req.body.imageUrl || "";
    if (req.file) {
      const cloudResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = cloudResult.secure_url;
    }

    const category = await findOrCreateCategory(categoryName, themeIdInt);
    const postSlug = slugify(slug);

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        themeId: themeIdInt,
        categoryId: category.id,
        title,
        description,
        content,
        imageUrl,
        altText,
        slug: postSlug,
      },
      include: { user: true, theme: true, category: true },
    });

    res.json(formatPostForFrontend(updatedPost));
  } catch (error) {
    console.error("Erreur update post:", error);
    if (error.code === "P2025")
      return res.status(404).json({ error: "Post non trouvé." });
    if (error.code === "P2002")
      return res.status(409).json({ error: "Slug déjà existant." });
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// ---------------------------
// DELETE /api/posts/:id
// ---------------------------
router.delete("/:id", async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    await prisma.post.delete({ where: { id: postId } });
    res.status(204).send();
  } catch (error) {
    console.error("Erreur suppression post:", error);
    if (error.code === "P2025")
      return res.status(404).json({ error: "Post non trouvé." });
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// ---------------------------
// Like/unlike
// ---------------------------
router.post("/:postId/like", toggleLike);

export default router;
