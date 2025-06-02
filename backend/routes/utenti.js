const express = require("express");
const router = express.Router();
const Utente = require("../models/Utenti");
const bcrypt = require("bcrypt");

// ➕ POST /utenti - Registrazione nuovo utente
router.post("/", async (req, res) => {
  try {
    const { username, email, password, dataDiNascita, numeroTelefono, ruolo } =
      req.body;

    // Controllo base
    if (!username || !email || !password || !dataDiNascita || !numeroTelefono) {
      return res.status(400).json({ message: "Campi obbligatori mancanti" });
    }

    // Verifica che email o username non siano già registrati
    const esisteUtente = await Utente.findOne({
      $or: [{ email }, { username }],
    });
    if (esisteUtente) {
      return res.status(409).json({ message: "Email o username già in uso" });
    }

    const nuovoUtente = new Utente({
      username,
      email,
      password, // verrà criptata dal pre-save hook nel modello
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

// 🔍 GET /utenti - Recupera tutti gli utenti (senza password!)
router.get("/", async (req, res) => {
  try {
    const utenti = await Utente.find().select("-password");
    res.json(utenti);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔍 GET /utenti/:id - Recupera un utente specifico (senza password!)
router.get("/:id", async (req, res) => {
  try {
    const utente = await Utente.findById(req.params.id).select("-password");
    if (!utente) return res.status(404).json({ message: "Utente non trovato" });
    res.json(utente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔐 POST /utenti/login - Login utente (verifica password)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email e password richiesti" });

    const utente = await Utente.findOne({ email });
    if (!utente) return res.status(401).json({ message: "Credenziali errate" });

    const match = await bcrypt.compare(password, utente.password);
    if (!match) return res.status(401).json({ message: "Credenziali errate" });

    // Login riuscito (qui puoi gestire JWT o sessioni)
    res.json({
      message: "Login effettuato",
      utenteId: utente._id,
      ruolo: utente.ruolo,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
