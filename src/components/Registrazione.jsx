import "./Registrazione.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Registrazione() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    dataDiNascita: "",
    numeroTelefono: "",
  });

  const [errori, setErrori] = useState({});
  const [messaggioServer, setMessaggioServer] = useState("");

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexTelefono = /^(\+39)?\s?\d{9,10}$/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // Funzione di validazione completa al submit
  const validaForm = () => {
    const nuoviErrori = {};

    if (!formData.username.trim()) {
      nuoviErrori.username = "Username obbligatorio.";
    }

    if (!formData.email.trim()) {
      nuoviErrori.email = "Email obbligatoria.";
    } else if (!regexEmail.test(formData.email)) {
      nuoviErrori.email = "Email non valida.";
    }

    if (!formData.password.trim()) {
      nuoviErrori.password = "Password obbligatoria.";
    } else if (!regexPassword.test(formData.password)) {
      nuoviErrori.password = "Min 8 caratteri, almeno una lettera e un numero.";
    }

    if (!formData.dataDiNascita) {
      nuoviErrori.dataDiNascita = "Inserisci la data di nascita.";
    } else {
      const oggi = new Date();
      const dataInserita = new Date(formData.dataDiNascita);
      if (dataInserita > oggi) {
        nuoviErrori.dataDiNascita =
          "Data di nascita non può essere nel futuro.";
      }
    }

    if (!formData.numeroTelefono.trim()) {
      nuoviErrori.numeroTelefono = "Numero di telefono obbligatorio.";
    } else if (!regexTelefono.test(formData.numeroTelefono)) {
      nuoviErrori.numeroTelefono =
        "Numero non valido (es. +393471234567 o 3471234567).";
    }

    setErrori(nuoviErrori);

    return Object.keys(nuoviErrori).length === 0;
  };

  // Validazione in tempo reale per il singolo campo
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    setErrori((prev) => {
      const nuoviErrori = { ...prev };

      if (name === "username") {
        if (!value.trim()) {
          nuoviErrori.username = "Username obbligatorio.";
        } else {
          delete nuoviErrori.username;
        }
      }

      if (name === "email") {
        if (!value.trim()) {
          nuoviErrori.email = "Email obbligatoria.";
        } else if (!regexEmail.test(value)) {
          nuoviErrori.email = "Email non valida.";
        } else {
          delete nuoviErrori.email;
        }
      }

      if (name === "password") {
        if (!value.trim()) {
          nuoviErrori.password = "Password obbligatoria.";
        } else if (!regexPassword.test(value)) {
          nuoviErrori.password =
            "Min 8 caratteri, almeno una lettera e un numero.";
        } else {
          delete nuoviErrori.password;
        }
      }

      if (name === "dataDiNascita") {
        if (!value) {
          nuoviErrori.dataDiNascita = "Inserisci la data di nascita.";
        } else {
          const oggi = new Date();
          const dataInserita = new Date(value);
          if (dataInserita > oggi) {
            nuoviErrori.dataDiNascita =
              "Data di nascita non può essere nel futuro.";
          } else {
            delete nuoviErrori.dataDiNascita;
          }
        }
      }

      if (name === "numeroTelefono") {
        if (!value.trim()) {
          nuoviErrori.numeroTelefono = "Numero di telefono obbligatorio.";
        } else if (!regexTelefono.test(value)) {
          nuoviErrori.numeroTelefono =
            "Numero non valido (es. +393471234567 o 3471234567).";
        } else {
          delete nuoviErrori.numeroTelefono;
        }
      }

      return nuoviErrori;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessaggioServer("");

    if (!validaForm()) return;

    try {
      const response = await fetch("http://localhost:8080/api/utenti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessaggioServer("✅ Registrazione completata con successo!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessaggioServer(`❌ Errore: ${result.message}`);
      }
    } catch (err) {
      console.error("Errore nella richiesta:", err);
      setMessaggioServer("❌ Errore di connessione col server.");
    }
  };

  return (
    <div className="registrazione-wrapper">
      <div className="immagine-container">
        <img
          src="/src/assets/fotoregistrazione.png"
          alt="Illustrazione nutrizione"
          className="immagine-laterale"
        />
      </div>

      <div className="registrazione-container">
        <h2 style={{ color: "#4b775c" }}>🍏 Registrati su Nutralyze</h2>
        <p style={{ color: "#3d614c" }}>
          Inizia il tuo viaggio verso una vita più sana!
        </p>
        <form onSubmit={handleSubmit} className="form-registrazione" noValidate>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errori.username && <p className="errore">{errori.username}</p>}

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
            name="dataDiNascita"
            value={formData.dataDiNascita}
            onChange={handleChange}
          />
          {errori.dataDiNascita && (
            <p className="errore">{errori.dataDiNascita}</p>
          )}

          <input
            type="tel"
            name="numeroTelefono"
            placeholder="Numero di telefono"
            value={formData.numeroTelefono}
            onChange={handleChange}
          />
          {errori.numeroTelefono && (
            <p className="errore">{errori.numeroTelefono}</p>
          )}

          <button
            type="submit"
            disabled={Object.keys(errori).length > 0}
            style={{
              cursor:
                Object.keys(errori).length > 0 ? "not-allowed" : "pointer",
            }}
          >
            Registrati
          </button>
        </form>

        {messaggioServer && (
          <p className="messaggio-server">{messaggioServer}</p>
        )}

        <div className="torna">
          <Link to="/">Torna alla home</Link>
        </div>
      </div>
    </div>
  );
}

export default Registrazione;
