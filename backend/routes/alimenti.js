const express = require("express");
const router = express.Router();
const Alimento = require("../models/Alimento"); // Importa lo schema

// 📥 GET tutti gli alimenti
router.get("/", async (req, res) => {
  try {
    const alimenti = await Alimento.find(); // ← QUERY al DB
    res.json(alimenti);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➕ POST per inserire un nuovo alimento
router.post("/", async (req, res) => {
  const nuovoAlimento = new Alimento(req.body); // ← prendi i dati dal body
  try {
    const salvato = await nuovoAlimento.save(); // ← QUERY: salva nel DB
    res.status(201).json(salvato);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔍 GET alimento tramite nome (es: /api/alimenti/cerca?nome=olio)
router.get("/cerca", async (req, res) => {
  const nomeDaCercare = req.query.nome;

  try {
    const risultati = await Alimento.find({
      Nome: { $regex: new RegExp(`^${nomeDaCercare}`, "i") }, // ← inizia per "olio"
    });

    res.json(risultati);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
