const express = require("express");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require('http');

const {Server} = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// log received requests
app.use((req, res, next) => {
  console.log(
    `A ${req.method} request recieved at ${new Date().toISOString()}`
  );
  next();
});

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database not connected ", error));

// middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));
app.use("/verifiers", require("./routes/verifier.routes"));
app.use("/admin", require("./routes/adminRoutes"));

// error handler
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000; //5000
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port ${PORT}`)
);

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté');
  });

  socket.on('envoyerMessage', (msg) => {
    // Vous pouvez ici filtrer le message ou enregistrer dans une base de données si nécessaire
    io.emit('recevoirMessage', msg); // Cette ligne renvoie le message à tous les utilisateurs connectés
  });
});

server.listen(6000, () => console.log('Serveur démarré sur le port ${6000}'));