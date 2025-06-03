import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GestioneUtenti from "./GestioneUtenti";
import UploadAlimento from "./UploadAlimento";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("utente");
    navigate("/accedi");
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="admin-page">
      {/* Bottone per aprire la sidebar se è chiusa */}
      {!isSidebarOpen && (
        <button
          className="toggle-sidebar-btn"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰
        </button>
      )}

      {/* Overlay per chiudere la sidebar cliccando fuori */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Sidebar di navigazione per le funzionalità admin */}
      <nav className={`admin-navbar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={closeSidebar}>
          ✖
        </button>
        <h2>🍃 Admin Panel</h2>
        <div className="admin-nav-links">
          <Link to="/aggiungiProdotto" onClick={closeSidebar}>
            Aggiungi Prodotto
          </Link>
          <Link to="/rimuoviProdotto" onClick={closeSidebar}>
            Rimuovi Prodotto
          </Link>
          <button
            onClick={() => {
              closeSidebar();
              handleLogout();
            }}
          >
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* Contenuto centrale della dashboard */}
      <section
        className={`admin-dashboard ${isSidebarOpen ? "with-sidebar" : ""}`}
      >
        <h3>Benvenuto nella dashboard nutrizionale 🥑</h3>
        <p>
          Qui puoi gestire il database degli alimenti, caricare file JSON, e
          amministrare gli utenti.
        </p>

        {/* Azioni principali con descrizione */}
        <div className="admin-actions">
          <Link to="/aggiungiProdotto" className="admin-box">
            ➕ Aggiungi Prodotto
            <p className="admin-box-desc">
              Inserisci un nuovo alimento manualmente
            </p>
          </Link>
          <Link to="/rimuoviProdotto" className="admin-box">
            ❌ Rimuovi Prodotto
            <p className="admin-box-desc">
              Cancella un alimento esistente dal database
            </p>
          </Link>
        </div>

        {/* Upload JSON: utile per caricare alimenti da file */}
        <div className="upload-section">
          <h4>📁 Caricamento Alimento da File JSON</h4>
          <p>
            Carica un alimento completo tramite un file JSON conforme allo
            schema previsto. Il sistema verifica automaticamente che tutti i
            campi siano presenti.
          </p>
          <UploadAlimento />
        </div>

        {/* Gestione utenti registrati */}
        <div className="admin-utenti-section">
          <h4>👥 Gestione Utenti</h4>
          <p>
            Qui puoi cercare, e eliminare account utenti. Inserisci lo username
            per effettuare un'azione.
          </p>
          <GestioneUtenti />
        </div>
      </section>
    </div>
  );
}

export default Admin;
