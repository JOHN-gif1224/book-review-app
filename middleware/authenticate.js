const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authenticateToken = (req, res, next) => {
  // Le token est envoyé dans le header "Authorization"
  const authHeader = req.headers["authorization"];

  // Extraction du token
  const token = authHeader && authHeader.split(" ")[1];

  // Si aucun token n'est fourni -> 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: "Accès refusé: token manquant" });
  }

  // Validation du token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // Token invalide ou expiré
      return res.status(403).json({ message: "Token invalide ou expiré" });
    }

    // Token valide
    req.user = decoded;

    next(); // on passe à la route suivante
  });
};

module.exports = authenticateToken;
