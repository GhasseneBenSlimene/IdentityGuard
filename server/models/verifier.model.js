const mongoose = require("mongoose");
const uuid = require("uuid");

const verifierSchema = mongoose.Schema(
  {
    verifierId: {
      type: String,
      unique: true,
    },
    createdAt: {
      type: Date,
      expires: 3600,
      default: Date.now,
      require: true,
    },
  }
);


const generateUniqueId = () => {
  return uuid.v4().replace(/-/g, "").substr(0, 12); // Génère un identifiant de 12 caractères
};

// Avant de sauvegarder un vérificateur, génère un identifiant unique
verifierSchema.pre("save", function(next) {
  this.verifierId = generateUniqueId();
  next();
});

module.exports = mongoose.model("Verifier", verifierSchema);
