const express = require("express");

// Création d'un "mini-routeur" séparer de l'application principale
const router = express.Router();

const {
  getAllBooksAsync,
  getBookByISBNAsync,
  getBooksByAuthorAsync,
  getBooksByTitleAsync,
} = require("../data/asyncBooks");

// Import des données des livres
const books = require("../data/books");

// GET /books-> renvoie la liste complète des livres
router.get("/books", async (req, res) => {
  try {
    const allBooks = await getAllBooksAsync();
    res.status(200).json(allBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get /books/isbn/:isbn -> renvoie un livre grâce à son ISBN
router.get("/books/isbn/:isbn", async (req, res) => {
 try {
    const book = await getBookByISBNAsync(req.params.isbn);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// GET /books/author/:author -> renvoie tous les livres d'un auteur donné
router.get("/books/author/:author", async (req, res) => {
    try {
    const matchingBooks = await getBooksByAuthorAsync(req.params.author);
    res.status(200).json(matchingBooks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// GET /book/title/:title -> renvoie tous les livres correspondant à un titre donné
router.get("/books/title/:title", async (req, res) => {
  try {
    const matchingBooks = await getBooksByTitleAsync(req.params.title);
    res.status(200).json(matchingBooks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// GET /books/review/:isbn -> Renvoie les critiques d'un livre donné
router.get("/books/review/:isbn", (req, res) => {
 const book = books[req.params.isbn];
  if (!book) {
    return res.status(404).json({ message: "Livre non trouvé pour cet ISBN" });
  }
  res.status(200).json(book.reviews);
});

// Export du "Router" pour l'utiliser dans index.js
module.exports = router;
