// Importation de Express
const express = require("express");
const session = require("express-session");

// "Instance" de l'application Express (Objet central qui va gérer les routes et middlewares)
const app = express();

// Définition du port sur lequel le serveur va écouter
const PORT = 5000;

// MIDDLEWARE: permet à Express de comprendre le JSON envoyé dans le corps des requêtes
// Sans ça, req.body serait "undefined"
app.use(express.json());

// Configuration du Middleware de session
app.use(
  session({
    // secret: clé utilisée pour signer le cookie de session
    secret: "fingerprint_customer",

    // resave: ne re-sauvegarde pas la session si elle n'a pas été modifiée
    resave: true,

    // saveUninitialized: sauvegarde même les sessions vides
    saveUninitialized: true,
  }),
);

// On importe le routeur des routes générale et d'authentifications
const generalRoutes = require("./routes/general");
const { router: authRoutes} = require("./routes/auth");

// On monte ce routeur sur le p réfixe "/"
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
