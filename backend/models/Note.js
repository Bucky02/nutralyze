const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    utenteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utente",
      required: true,
    },
    data: {
      type: String, // Formato "YYYY-MM-DD"
      required: true,
    },
    testo: {
      type: String,
      required: true,
    },
    // opzionale: timestamp automatici
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema, "note");
