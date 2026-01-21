import jwt from 'jsonwebtoken';

// Authentifie l'utilisateur via JWT
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Format attendu : "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token manquant. Accès refusé.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifie que les infos nécessaires sont présentes
    if (!decoded.id || !decoded.email || !decoded.role) {
      return res.status(400).json({ error: 'Token incomplet ou mal formé.' });
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error('Erreur vérif token :', error);
    return res.status(403).json({ error: 'Token invalide ou expiré.' });
  }
};

// 🔐 Vérifie que l'utilisateur est ADMIN
export const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Accès refusé : rôle ADMIN requis.' });
  }
  next();
};

// Authentification facultative (pour les pages publiques)
export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return next(); // Pas de token ? → continue sans utilisateur

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (err) {
    // Token invalide → ignorer, ne pas bloquer l'accès
  }

  next();
};

