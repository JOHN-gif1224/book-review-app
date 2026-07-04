const books = require("./books");

const getAllBooksAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (books) {
        resolve(books);
      } else {
        reject(new Error("Impossible de récupérer les livres !"));
      }
    }, 100);
  });
};

const getBookByISBNAsync = (isbn) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = books[isbn];
      if (book) {
        resolve(book);
      } else {
        reject(new Error(`Aucun livre trouvé pour l'ISBN : ${isbn}`));
      }
    }, 100);
  });
};

const getBooksByAuthorAsync = (author) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = Object.values(books).filter(
        (book) => book.author.toLowerCase() === author.toLowerCase(),
      );
      if (result.length > 0) {
        resolve(result);
      } else {
        reject(new Error(`Aucun livre trouvé pour l'auteur : ${author}`));
      }
    }, 100);
  });
};

const getBooksByTitleAsync = (title) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = Object.values(books).filter(
        (book) => book.title.toLowerCase() === title.toLowerCase(),
      );
      if (result.length > 0) {
        resolve(result);
      } else {
        reject(new Error(`Aucun livre trouvé pour le titre : ${title}`));
      }
    }, 100);
  });
};

module.exports = {
  getAllBooksAsync,
  getBookByISBNAsync,
  getBooksByAuthorAsync,
  getBooksByTitleAsync,
};
