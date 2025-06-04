const express = require("express");
const router = express.Router();

const Pasto = require("../models/Pasto");

// ➕ POST /pasti - Aggiungi un pasto
// POST /pasti - Aggiungi un pasto
router.post("/", async (req, res) => {
  const { utenteId, alimentoId, data, grammi } = req.body;
  console.log("📥 Richiesta POST ricevuta:", req.body); // 👈

  if (!utenteId || !alimentoId || !data || !grammi) {
    return res.status(400).json({ message: "Tutti i campi sono obbligatori." });
  }

  const nuovoPasto = new Pasto({
    utenteId,
    alimentoId,
    data, // 🔥 Lascia in formato stringa YYYY-MM-DD (es. "2025-06-04")
    grammi,
  });

  try {
    const salvato = await nuovoPasto.save();
    res.status(201).json(salvato);
  } catch (err) {
    console.error("❌ Errore nel salvataggio del pasto:", err.message); // 👈

    res.status(400).json({ message: err.message });
  }
});

// GET /pasti?utenteId=...&data=... - Recupera pasti con alimento dettagliato
router.get("/", async (req, res) => {
  const { utenteId, data } = req.query;

  if (!utenteId || !data) {
    return res.status(400).json({ message: "utenteId e data richiesti" });
  }

  try {
    const pasti = await Pasto.find({ utenteId, data })
      .populate("alimentoId") // 👈 Ottieni tutti i dati dell’alimento
      .select("alimentoId grammi data");

    res.json(pasti);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// 🔄 PUT /pasti/update-quantita - Aggiorna i grammi di un pasto
router.put("/update-quantita", async (req, res) => {
  const { pastoId, grammi } = req.body;

  if (!pastoId || !grammi) {
    return res.status(400).json({ message: "Dati incompleti" });
  }

  try {
    const aggiornato = await Pasto.findByIdAndUpdate(
      pastoId,
      { grammi },
      { new: true }
    );

    if (!aggiornato) {
      return res.status(404).json({ message: "Pasto non trovato" });
    }

    res.json(aggiornato);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
