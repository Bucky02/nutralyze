// routes/note.js
const express = require("express");
const router = express.Router();

const Note = require("../models/Note");

// GET /note?utenteId=...&data=... - Recupera la nota di un giorno specifico
router.get("/", async (req, res) => {
  const { utenteId, data } = req.query;
  if (!utenteId || !data) {
    return res.status(400).json({ message: "utenteId e data sono richiesti" });
  }

  try {
    const nota = await Note.findOne({ utenteId, data });
    if (!nota) {
      return res.status(404).json({ message: "Nota non trovata" });
    }
    res.json(nota);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /note - Crea o aggiorna la nota di un giorno
router.post("/", async (req, res) => {
  const { utenteId, data, testo } = req.body;
  if (!utenteId || !data || testo === undefined) {
    return res
      .status(400)
      .json({ message: "utenteId, data e testo sono obbligatori" });
  }

  try {
    // Cerca se esiste già una nota per utente e data
    let nota = await Note.findOne({ utenteId, data });

    if (nota) {
      // Aggiorna
      nota.testo = testo;
      await nota.save();
      res.json(nota);
    } else {
      // Crea nuova
      nota = new Note({ utenteId, data, testo });
      await nota.save();
      res.status(201).json(nota);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /note/:id - Aggiorna una nota esistente (opzionale)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { testo } = req.body;

  if (testo === undefined) {
    return res.status(400).json({ message: "Campo testo obbligatorio" });
  }

  try {
    const nota = await Note.findByIdAndUpdate(id, { testo }, { new: true });
    if (!nota) {
      return res.status(404).json({ message: "Nota non trovata" });
    }
    res.json(nota);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /note/:id - Elimina una nota (opzionale)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const nota = await Note.findByIdAndDelete(id);
    if (!nota) {
      return res.status(404).json({ message: "Nota non trovata" });
    }
    res.json({ message: "Nota eliminata con successo" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
