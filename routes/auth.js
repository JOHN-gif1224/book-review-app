const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const users = require("../data/users");

const JWT_SECRET = "access"; // clé secret pour signer les JWT

// Fonction utilitaire vérifiant si un utilisateur existe déjà
const isValid = (username) => {
  // .some() renvoie "True" si au moins un élément du tableau respect la condition
  return users.some((user) => user.username === username);
};

// POST /register -> inscription d'un nouvel utilisateur
router.post("/register", (req, res) => {
  // req.body contient les données envoyés dans le corps de la requête grâce à express.json()
  const { username, password } = req.body;

  // Vérification de la présence des champs
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username et Password sont requis" });
  }

  // Vérification que le "username" n'est pas pris
  if (isValid(username)) {
    return res
      .status(409)
      .json({ message: "Ce nom d'utilisateur existe déjà" });
  }

  users.push({ username, password });

  // On ajoute l'utilisateur si tout est bon
  res.status(200).json({ message: "Utilisateur enregister avec succès" });
});

// POST /login -> connexion d'un utilisateur
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username et Password sont requis !" });
  }

  // Recherche d'un utilisateur avec username et password, correspondant
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if(!user) {
    return res.status(401).json({message: "Username ou Password invalide"})
  }

  // Création de la session et du JWT

  // Création de la session (côté serveur)
  req.session.user = { username };

  // Génération du JWT signé avec la clé secrete
  const token = jwt.sign(
    { username }, // Données encodées dans le token: Payload
    JWT_SECRET, // clé secret
    { expiresIn: "1h" }, // options
  );

  // Renvoie du token au client
  res.status(200).json({
    message: "Connexion réussie",
    token: token,
  });
});

module.exports = { router, JWT_SECRET };
