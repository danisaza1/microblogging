import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET /api/themes
export const getAllThemes = async (req, res) => {
  try {
    const themes = await prisma.theme.findMany({ include: { posts: true } });
    res.json(themes);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// GET /api/themes/:id
export const getThemeById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const theme = await prisma.theme.findUnique({
      where: { id },
      include: { posts: true }
    });
    if (!theme) return res.status(404).json({ error: 'Thème non trouvé' });
    res.json(theme);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST /api/themes
export const createTheme = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Le nom est requis' });

  try {
    const newTheme = await prisma.theme.create({ data: { name } });
    res.status(201).json(newTheme);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Le thème existe déjà' });
    }
    res.status(500).json({ error: 'Erreur interne' });
  }
};

// PUT /api/themes/:id
export const updateTheme = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Le nom est requis' });

  try {
    const updated = await prisma.theme.update({
      where: { id },
      data: { name }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Impossible de mettre à jour' });
  }
};

// DELETE /api/themes/:id
export const deleteTheme = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.theme.delete({ where: { id } });
    res.json({ message: 'Thème supprimé' });
  } catch (err) {
    res.status(500).json({ error: 'Impossible de supprimer' });
  }
};
