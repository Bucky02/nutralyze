import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Accedi.css"; // Usa lo stesso stile della registrazione
import LoginAlert from "./LoginAlert";
import imgLogin from "../assets/avocado2.jpg"; // Se hai un'immagine specifica

function Accedi() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/utenti/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlertMessage(data.message || "Errore nel login");
        setShowAlert(true);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("utente", JSON.stringify(data.utente));
      setAlertMessage("Login effettuato con successo!");
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      setAlertMessage("Errore di connessione");
      setShowAlert(true);
      console.error(error);
    }
  };

  return (
    <div className="accedi-wrapper">
      {showAlert && <LoginAlert message={alertMessage} />}

      <div className="accedi-immagine-container">
        <div className="accedi-box">
          <img
            src="/src/assets/avocado.jpg"
            alt="immagine 1"
            className="accedi-box-img"
          />
        </div>
        <div className="accedi-box">
          <img
            src="/src/assets/avocado2.jpg"
            alt="immagine 2"
            className="accedi-box-img"
          />
        </div>
        <div className="accedi-box">
          <img
            src="/src/assets/insalata.jpg"
            alt="immagine 3"
            className="accedi-box-img"
          />
        </div>
        <div className="accedi-box">
          <img
            src="/src/assets/cibo2.jpg"
            alt="immagine 4"
            className="accedi-box-img"
          />
        </div>
      </div>

      <div className="accedi-container">
        <h2>Accedi al tuo account</h2>
        <p>Inserisci le tue credenziali per continuare</p>

        <form className="accedi-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Accedi</button>
        </form>

        <div className="accedi-torna">
          <Link to="/registrazione">Non hai un account? Registrati</Link>
          <br />
          <Link to="/">Torna alla home</Link>
        </div>
      </div>
    </div>
  );
}

export default Accedi;
