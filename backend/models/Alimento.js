const mongoose = require("mongoose");

// Definizione dello schema (puoi adattare i tipi in base al tuo dataset!)
const AlimentoSchema = new mongoose.Schema({
  ID: Number,
  Nome: String,
  Categoria: String,
});

// Esportazione del modello
module.exports = mongoose.model("Alimento", AlimentoSchema, "giochi");
