const express = require("express");

// Création d'un "mini-routeur" séparer de l'application principale
const router = express.Router();

// Import des données des livres
const books = require("../data/books");

// GET /books-> renvoie la liste complète des livres
router.get("/books", (req, res) => {
  res.status(200).json(books);
});

// Get /books/isbn/:isbn -> renvoie un livre grâce à son ISBN
router.get("/books/isbn/:isbn", (req, res) => {
  // req.params contient les valeurs capturés dan l'URL
  const isbn = req.params.isbn;

  const book = books[isbn];

  // Si le livre n'existe pas, on envoie une erreur 404
  if (!book) {
    // "return", permet d'arrêter directement l'exécution de la fonction
    return res.status(404).json({ message: "Livre non trouvé pour cet ISBN" });
  }

  res.status(200).json(book);
});

// GET /books/author/:author -> renvoie tous les livres d'un auteur donné
router.get("/books/author/:author", (req, res) => {
  const author = req.params.author;

  // On transforme l'objet "books" en tableau pour pouvoir utiliser .filter()
  // grâce à Object.values()
  const matchingBooks = Object.values(books).filter(
    (book) => book.author.toLowerCase() === author.toLowerCase(),
  );

  if (matchingBooks.length === 0) {
    return res
      .status(404)
      .json({ message: "Aucun livre trouver pour cet auteur" });
  }

  res.status(200).json(matchingBooks);
});

// GET /book/title/:title -> renvoie tous les livres correspondant à un titre donné
router.get("/books/title/:title", (req, res) => {
  const title = req.params.title;

  const matchingBooks = Object.values(books).filter(
    (book) => book.title.toLowerCase() === title.toLowerCase(),
  );

  if (matchingBooks.length === 0) {
    return res.status(404).json({ message: "Aucun livre de ce titre trouvé" });
  }

  res.status(200).json(matchingBooks);
});
 
// GET /books/review/:isbn -> Renvoie les critiques d'un livre donné
router.get("/books/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Livre non trouvé pour cet ISBN" });
  }

  res.status(200).json(book.reviews);
});

// Export du "Router" pour l'utiliser dans index.js
module.exports = router;
