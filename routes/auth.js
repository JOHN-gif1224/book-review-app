const express = require("express");
const router = express.Router();
const users = require("../data/users");

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

module.exports = router;