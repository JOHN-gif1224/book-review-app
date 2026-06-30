// Simulation d'une base de données avec un objet "books"
// On peut accéder directement à un élément d'un objet plutôt qu'a celui d'un tableau

let books = {
    "1": {
    isbn: "1",
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    reviews: {} // les critiques seront ajoutées ici, indexées par nom d'utilisateur
  },
  "2": {
    isbn: "2",
    title: "Fairy tales",
    author: "Hans Christian Andersen",
    reviews: {}
  },
  "3": {
    isbn: "3",
    title: "The Divine Comedy",
    author: "Dante Alighieri",
    reviews: {}
  }
};

// Exportation de l'objet pour pouvoir l'utiliser dans d'autres fichiers
module.exports = books;
