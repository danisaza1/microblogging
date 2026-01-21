import prisma from '../lib/prisma.js';

// GET /api/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { posts: true, comments: true }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
};

// GET /api/users/:id
export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true, comments: true }
    });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST /api/users
export const createUser = async (req, res) => {
  const { username, email, passwordHash, role } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        role: role || 'USER',
      },
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la création de l’utilisateur' });
  }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { username, email, role } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username, email, role },
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la modification de l’utilisateur' });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    await prisma.user.delete({ where: { id: userId } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la suppression de l’utilisateur' });
  }
};
