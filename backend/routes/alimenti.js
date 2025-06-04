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

router.post("/", async (req, res) => {
  try {
    const alimento = req.body;

    // Controllo che l'ID esista e sia un numero (intero)
    if (!alimento.ID || typeof alimento.ID !== "number") {
      return res.status(400).json({ message: "ID mancante o non valido" });
    }

    // Controlla se esiste già un alimento con lo stesso ID
    const esisteId = await Alimento.findOne({ ID: alimento.ID });
    if (esisteId) {
      return res.status(409).json({ message: "ID già esistente" });
    }

    // Se tutto ok, salva il nuovo alimento
    const nuovoAlimento = new Alimento(alimento);
    const salvato = await nuovoAlimento.save();
    res.status(201).json(salvato);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

router.post("/caricaAlimento", async (req, res) => {
  try {
    const alimento = req.body;

    if (!alimento || !alimento.Nome) {
      return res
        .status(400)
        .json({ message: "Dati alimento mancanti o Nome assente" });
    }

    // Normalizza il nome (minuscolo + trim)
    const nomeNormalizzato = alimento.Nome.toLowerCase().trim();

    // Controlla se esiste già un alimento con quel nome (case insensitive)
    const esiste = await Alimento.findOne({
      Nome: { $regex: `^${nomeNormalizzato}$`, $options: "i" },
    });

    if (esiste) {
      return res
        .status(409)
        .json({ message: "Alimento con questo nome già esiste" });
    }

    // Salva il nuovo alimento
    const nuovoAlimento = new Alimento(alimento);
    const salvato = await nuovoAlimento.save();

    res
      .status(201)
      .json({ message: "Alimento inserito con successo", alimento: salvato });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// 🗑 DELETE /alimenti/:id - Elimina un alimento dato il suo ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const eliminato = await Alimento.findByIdAndDelete(id);

    if (!eliminato) {
      return res.status(404).json({ message: "Alimento non trovato" });
    }

    res.json({
      message: `Alimento '${eliminato.Nome}' eliminato con successo`,
      eliminato,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
