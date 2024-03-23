const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require('http'); // Importer le module 'http'
const socketManager = require('./sockets/socketManager'); // Importer le gestionnaire de sockets

const app = express(); // Utilisation de la fonction express pour créer l'application

// Middleware pour logger les requêtes reçues
app.use((req, res, next) => {
  console.log(
    `A ${req.method} request received at ${new Date().toISOString()}`
  );
  next();
});

// Connexion à la base de données
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database not connected ", error));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Middleware pour les CORS
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173", // Autoriser les requêtes depuis ce domaine
}));

// Routes
app.use("/", require("./routes/authRoutes"));
app.use("/verifiers", require("./routes/verifier.routes"));
app.use("/admin", require("./routes/adminRoutes"));

// Gestion des erreurs
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send("Something broke!");
});

// Serveur principal écoutant les requêtes HTTP sur le port 8000
const httpServer = http.createServer(app); // Créer un serveur HTTP pour Express
const HTTP_PORT = process.env.HTTP_PORT || 8000; // Utilisez le port 8000 pour les requêtes HTTP
httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP Server is running on port ${HTTP_PORT}`);
});

// Serveur pour les sockets écoutant sur le port 3000
const io = require('socket.io')(3000, {
  cors: {
    origin: "http://localhost:5173", // Autoriser les requêtes depuis ce domaine
    methods: ["GET", "POST"] // Méthodes HTTP autorisées
  }
});

// Utiliser le gestionnaire de sockets
socketManager(io);
