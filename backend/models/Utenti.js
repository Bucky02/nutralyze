const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UtenteSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  dataDiNascita: {
    type: Date,
    required: true,
  },
  numeroTelefono: {
    type: String,
    required: true,
  },
  ruolo: {
    type: String,
    enum: ["utente", "admin"],
    default: "utente",
  },
});

// Pre-save hook per criptare la password
UtenteSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Utente", UtenteSchema, "utenti");
