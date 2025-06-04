const mongoose = require("mongoose");

const PastoSchema = new mongoose.Schema({
  utenteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Utente",
    required: true,
  },
  alimentoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alimento",
    required: true,
  },
  data: {
    type: String, // 🔥 non Date ma String, es. "2025-06-04"
    required: true,
  },
  grammi: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Pasto", PastoSchema, "pasti");
