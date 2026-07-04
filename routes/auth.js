const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const users = require("../data/users");
const authenticateToken = require("../middleware/authenticate");
const books = require("../data/books");
const { JWT_SECRET } = require("../config");

// Fonction utilitaire vérifiant si un utilisateur existe déjà
const isValid = (username) => {
  // .some() renvoie "True" si au moins un élément du tableau respect la condition
  return users.some((user) => user.username === username);
};

// POST /register -> inscription d'un nouvel utilisateur
router.post("/register", (req, res) => {
  // req.body contient les données envoyés dans le corps de la requête grâce à express.json()
  const { username, password } = req.body; // Destructuring

  // Vérification de la présence des champs
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username et Password sont requis" });
  }

  // Vérifions que le "username" n'est pas pris
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

  if (!user) {
    return res.status(401).json({ message: "Username ou Password invalide" });
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

// PUT /books/review/:isbn -> ajoute ou modifie une critique
router.put("/books/review/:isbn", authenticateToken, (req, res) => {
  const isbn = req.params.isbn;
  const { review } = req.body;

  const username = req.user.username;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Livre non trouvé" });
  }

  if (!review) {
    return res
      .status(404)
      .json({ message: "Le contenu de la critique est requis" });
  }

  // Enrigistrement de la critique
  book.reviews[username] = review;

  res.status(200).json({
    message: "Critique ajoutée ou modifié avec succès",
    reviews: book.reviews,
  });
});

// DELETE /books/review/:isbn -> supprime la critique d'un livre
router.delete("/books/review/:isbn", authenticateToken, (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;

  const book = book[isbn];

  if (!book) {
    return res.status(404).json({ message: "Livre non trouvé" });
  }

  // Vérification de l'existence d'une critique provenant de l'utilisateur
  if (!book.reviews[username]) {
    return res
      .status(404)
      .json({ message: "Vous n'avez pas de critique sur ce livre" });
  }

  // On supprime uniquement la critique de l'utilisateur
  delete book.reviews[username];

  res
    .status(200)
    .json({ message: "Critique supprimée avec succès", reviews: book.reviews });
});

module.exports = { router };
