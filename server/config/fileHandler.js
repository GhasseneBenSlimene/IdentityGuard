const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Construire le chemin absolu vers le dossier uploads dans le dossier parent de config
const dir = path.join(__dirname, "..", "uploads");

// Vérifier si le dossier existe, sinon le créer
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const deleteFile = (dir) => {
  try {
    fs.unlinkSync(dir);
    console.log("File deleted!");
  } catch (error) {
    console.error("Error deleting file: ", error);
    throw error; // Propagate up the call stack
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Utiliser le chemin absolu pour la destination
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const safeDate = new Date().toISOString().replace(/:/g, "-");
    cb(null, safeDate + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload only images."), false);
    }
  },
});

module.exports = { upload, dir, deleteFile };
