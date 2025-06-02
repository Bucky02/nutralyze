const mongoose = require("mongoose");

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
    enum: ["utente", "admin"], // solo questi due valori
    default: "utente", // valore di default
  },
});

module.exports = mongoose.model("Utente", UtenteSchema, "utenti");
