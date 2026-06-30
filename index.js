// Importation de Express
const express = require("express");

// "Instance" de l'application Express (Objet central qui va gérer les routes et middlewares)
const app = express();

// Définition du port sur lequel le serveur va écouter
const PORT = 5000;

// MIDDLEWARE: permet à Express de comprendre le JSON envoyé dans le corps des requêtes
// Sans ça, req.body serait "undefined"
app.use(express.json());

// On importe le routeur des routes générale
const generalRoutes = require("./routes/general");
const authRoutes = require("./routes/auth");

// On monte ce routeur sur le préfixe "/"
app.use("/", generalRoutes);
app.use("/", authRoutes);

// ROUTE DE TEST: c'est quand on fait un GET sur "/"
app.get("/", (req, res) => {
  res.send("Bienvenu sur l'API Book Review !");
});

// Démarrage du serveur, qui écoute sur le PORT
app.listen(PORT, () => {
  console.log(`Serveur démarrer sur http://localhost:${PORT}`);
});
