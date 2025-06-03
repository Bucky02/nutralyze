const express = require("express");
const router = express.Router();
const Utente = require("../models/Utenti");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ➕ POST /utenti - Registrazione nuovo utente
router.post("/", async (req, res) => {
  try {
    const { username, email, password, dataDiNascita, numeroTelefono, ruolo } =
      req.body;

    if (!username || !email || !password || !dataDiNascita || !numeroTelefono) {
      return res.status(400).json({ message: "Campi obbligatori mancanti" });
    }

    const esisteUtente = await Utente.findOne({
      $or: [{ email }, { username }],
    });
    if (esisteUtente) {
      return res.status(409).json({ message: "Email o username già in uso" });
    }

    const nuovoUtente = new Utente({
      username,
      email,
      password, // criptata dal pre-save hook
      dataDiNascita,
      numeroTelefono,
      ruolo: ruolo || "utente",
    });

    const salvato = await nuovoUtente.save();
    res.status(201).json({
      message: "Utente registrato con successo",
      utenteId: salvato._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔐 POST /utenti/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email e password richiesti" });

    const utente = await Utente.findOne({ email });
    if (!utente) return res.status(401).json({ message: "Credenziali errate" });

    const match = await bcrypt.compare(password, utente.password);
    if (!match) return res.status(401).json({ message: "Credenziali errate" });

    const token = jwt.sign(
      {
        id: utente._id,
        ruolo: utente.ruolo,
        username: utente.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login effettuato",
      token,
      utente: {
        id: utente._id,
        ruolo: utente.ruolo,
        username: utente.username,
        email: utente.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔍 GET /utenti - Tutti gli utenti
router.get("/", async (req, res) => {
  try {
    const utenti = await Utente.find().select("-password");
    res.json(utenti);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔍 GET /utenti/:id - Dettaglio singolo utente
router.get("/:id", async (req, res) => {
  try {
    const utente = await Utente.findById(req.params.id).select("-password");
    if (!utente) return res.status(404).json({ message: "Utente non trovato" });
    res.json(utente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔍 GET /utenti/cerca/:username - Cerca utente per username esatto o parziale
router.get("/cerca/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const utenti = await Utente.find({
      username: { $regex: new RegExp(username, "i") },
    }).select("-password");

    res.json(utenti);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ❌ DELETE /utenti/elimina/:id
router.delete("/elimina/:id", async (req, res) => {
  try {
    const utente = await Utente.findByIdAndDelete(req.params.id);
    if (!utente) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    res.json({ message: "Utente eliminato correttamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
