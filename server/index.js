const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// log received requests
app.use((req, res, next) => {
  console.log(
    `A ${req.method} request received at ${new Date().toISOString()}`
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
    origin: "http://localhost:5173", // Autoriser les requêtes depuis ce domaine
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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// Gestion des connexions Socket.IO
io.on('connection', function(socket){
  console.log('Un utilisateur est connecté');

  socket.on('disconnect', function() {
    console.log('Utilisateur déconnecté');
  });

  socket.on('message', function(msg) {
    console.log('message reçu ' + msg);
  });
});

const PORT = process.env.PORT || 8000; // Port du serveur principal
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
