import React, { useState } from "react";

function GestioneUtenti() {
  const [username, setUsername] = useState("");
  const [utenteTrovato, setUtenteTrovato] = useState(null);
  const [messaggio, setMessaggio] = useState("");

  const cercaUtente = async () => {
    if (!username.trim()) {
      setMessaggio("Inserisci un username.");
      setUtenteTrovato(null);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/utenti/cerca/${username}`
      );
      if (!response.ok) throw new Error("Errore nella richiesta");

      const data = await response.json();
      if (data.length === 0) {
        setMessaggio("Utente non trovato.");
        setUtenteTrovato(null);
      } else {
        setUtenteTrovato(data[0]);
        setMessaggio(`Utente trovato: ${data[0].username}`);
      }
    } catch (error) {
      setMessaggio("Errore durante la ricerca.");
      setUtenteTrovato(null);
    }
  };

  const eliminaUtente = async () => {
    if (!utenteTrovato) return;

    const conferma = window.confirm(
      `Sei sicuro di voler eliminare l'utente "${utenteTrovato.username}"?`
    );
    if (!conferma) return;

    try {
      const response = await fetch(`/utenti/elimina/${utenteTrovato._id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Errore durante l'eliminazione");

      setMessaggio(
        `Utente "${utenteTrovato.username}" eliminato con successo.`
      );
      setUtenteTrovato(null);
      setUsername("");
    } catch (error) {
      setMessaggio("Errore durante l'eliminazione dell'utente.");
    }
  };

  return (
    <div
      style={{ maxWidth: "350px", margin: "20px auto", textAlign: "center" }}
    >
      <h3>Gestione Utenti</h3>
      <input
        type="text"
        placeholder="Cerca username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "8px", width: "70%" }}
      />
      <button
        onClick={cercaUtente}
        style={{ padding: "8px", marginLeft: "8px" }}
      >
        Cerca
      </button>

      <div style={{ marginTop: "15px", minHeight: "40px" }}>
        {messaggio && <p>{messaggio}</p>}
        {utenteTrovato && (
          <button
            onClick={eliminaUtente}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Elimina utente
          </button>
        )}
      </div>
    </div>
  );
}

export default GestioneUtenti;
