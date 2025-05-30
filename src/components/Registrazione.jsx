import "./Registrazione.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Registrazione() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
    dataNascita: "",
    telefono: "",
  });

  const [errori, setErrori] = useState({});

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexTelefono = /^(\+39)?\s?\d{9,10}$/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const validaForm = () => {
    const nuoviErrori = {};

    if (!formData.nome.trim()) nuoviErrori.nome = "Il nome è obbligatorio.";
    if (!formData.cognome.trim())
      nuoviErrori.cognome = "Il cognome è obbligatorio.";

    if (!regexEmail.test(formData.email))
      nuoviErrori.email = "Email non valida.";
    if (!regexPassword.test(formData.password))
      nuoviErrori.password = "Min 8 caratteri, almeno una lettera e un numero.";
    if (!formData.dataNascita)
      nuoviErrori.dataNascita = "Inserisci la data di nascita.";
    if (!regexTelefono.test(formData.telefono))
      nuoviErrori.telefono =
        "Numero non valido (es. +393471234567 o 3471234567).";

    setErrori(nuoviErrori);
    return Object.keys(nuoviErrori).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validaForm()) {
      alert("Registrazione completata!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="registrazione-container">
      <h2>Registrazione</h2>
      <form onSubmit={handleSubmit} className="form-registrazione">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
        />
        {errori.nome && <p className="errore">{errori.nome}</p>}

        <input
          type="text"
          name="cognome"
          placeholder="Cognome"
          value={formData.cognome}
          onChange={handleChange}
        />
        {errori.cognome && <p className="errore">{errori.cognome}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errori.email && <p className="errore">{errori.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errori.password && <p className="errore">{errori.password}</p>}

        <input
          type="date"
          name="dataNascita"
          value={formData.dataNascita}
          onChange={handleChange}
        />
        {errori.dataNascita && <p className="errore">{errori.dataNascita}</p>}

        <input
          type="tel"
          name="telefono"
          placeholder="Numero di telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
        {errori.telefono && <p className="errore">{errori.telefono}</p>}

        <button type="submit">Registrati</button>
      </form>
      <div className="torna">
        <Link to="/">Torna alla home</Link>
      </div>
    </div>
  );
}

export default Registrazione;
