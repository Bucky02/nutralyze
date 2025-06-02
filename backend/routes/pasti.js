const express = require("express");
const router = express.Router();

const Pasto = require("../models/Pasto");

// ➕ POST /pasti - Aggiungi un pasto
router.post("/", async (req, res) => {
  const { utenteId, alimentoId, data, grammi } = req.body;

  const nuovoPasto = new Pasto({
    utenteId,
    alimentoId,
    data: new Date(data), // Sicuro sia un oggetto Date
    grammi,
  });

  try {
    const salvato = await nuovoPasto.save();
    res.status(201).json(salvato);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔍 GET /pasti?utenteId=...&data=... - Recupera pasti di un utente in una data
router.get("/", async (req, res) => {
  const { utenteId, data } = req.query;

  if (!utenteId || !data) {
    return res.status(400).json({ message: "utenteId e data richiesti" });
  }

  try {
    const pasti = await Pasto.find({
      utenteId,
      data: new Date(data),
    })
      .populate("alimentoId") // 👈 Ottieni tutti i dati dell'alimento!
      .select("alimentoId grammi data"); // Puoi anche togliere select se vuoi tutto

    res.json(pasti);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
