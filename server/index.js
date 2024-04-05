const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const socketManager = require("./sockets/socketManager");
const { verifyRefusedSession } = require("./controllers/refusedController");

const { verifyAdminSession } = require("./controllers/adminController");
const { verifyAcceptedSession } = require("./controllers/verifier.controller");

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

// middleware
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Middleware pour les CORS
app.use(
  cors({
    credentials: true,
    origin: true, // Autoriser les requêtes depuis ce domaine
  })
);

// Routes
app.use("/", require("./routes/authRoutes"));

app.use("/verifiers", require("./routes/verifier.routes"));
app.use("/admin", verifyAdminSession, require("./routes/adminRoutes"));
app.use("/refused", verifyRefusedSession, require("./routes/refusedRoutes"));

// Gestion des erreurs
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port ${PORT}`)
);

// Serveur pour les sockets écoutant sur le port 3000
const io = require("socket.io")(3000, {
  cors: {
    origin: true, // Autoriser les requêtes depuis ce domaine
    methods: ["GET", "POST"], // Méthodes HTTP autorisées
  },
});

// Utiliser le gestionnaire de sockets
socketManager(io);
