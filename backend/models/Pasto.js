const mongoose = require("mongoose");

const PastoSchema = new mongoose.Schema({
  utenteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Utente", // nome del modello Mongoose dell'utente
    required: true,
  },
  alimentoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alimento", // nome del modello Mongoose dell'alimento
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  grammi: {
    type: Number,
    required: true,
  },
});

// Esportazione del modello
module.exports = mongoose.model("Pasto", PastoSchema, "pasti");
