const express = require("express");

// Création d'un "mini-routeur" séparer de l'application principale
const router = express.Router();

// Import des données des livres 
const books = require("../data/books");

// Route de test, pour vérifier que le routeur fonctionne
router.get("/", (req, res) => {
    res.send("Routes générales actives !");
});

// Export du "Router" pour l'utiliser dans index.js
module.exports = router;