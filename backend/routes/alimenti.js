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

router.get("/cerca", async (req, res) => {
  let nomeDaCercare = req.query.nome;

  if (!nomeDaCercare || nomeDaCercare.length < 3) {
    return res.json([]);
  }

  // Normalizza l'input dell'utente
  const normalizzata = nomeDaCercare
    .toLowerCase()
    .replace(/[^\w\s]|_/g, "") // rimuove punteggiatura (virgole, punti, ecc.)
    .replace(/\s+/g, " ") // normalizza spazi
    .trim();

  try {
    const tutti = await Alimento.find();

    const risultati = tutti.filter((alimento) => {
      const nomeDB = alimento.Nome.toLowerCase()
        .replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, " ")
        .trim();

      return nomeDB.startsWith(normalizzata); // ✅ controlla che inizi con l'input
    });

    res.json(risultati);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🍽 GET /alimenti/:id - Recupera dettagli di un alimento
router.get("/:id", async (req, res) => {
  try {
    const alimento = await Alimento.findById(req.params.id);
    if (!alimento)
      return res.status(404).json({ message: "Alimento non trovato" });
    res.json(alimento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
