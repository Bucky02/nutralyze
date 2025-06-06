import "./Calcolo.css";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function calcolaGrassi(alimento) {
  const toFloat = (val) => {
    if (val === undefined || val === null) return 0;
    if (typeof val === "number") return val;
    return parseFloat(val.toString().replace(",", ".")) || 0;
  };
  const grassiSaturi = toFloat(alimento["Acidi grassi, saturi (g)"]);
  const grassiMono = toFloat(alimento["Acidi grassi, monoinsaturi (g)"]);
  const grassiPoli = toFloat(alimento["Acidi grassi, polinsaturi (g)"]);
  return grassiSaturi + grassiMono + grassiPoli;
}

function Calcolo() {
  const [query, setQuery] = useState("");
  const [risultati, setRisultati] = useState([]);
  const [errore, setErrore] = useState(null);
  const [alimentiSelezionati, setAlimentiSelezionati] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [utenteId, setUtenteId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dataCorrente = new Date();
  const dataISO = dataCorrente.toISOString().split("T")[0];

  useEffect(() => {
    const utente = localStorage.getItem("utente");
    if (token && utente) {
      try {
        const utenteObj = JSON.parse(utente);
        setUsername(utenteObj.username || "Utente");
        setUtenteId(utenteObj.id || null);
      } catch {
        setUsername("Utente");
        setUtenteId(null);
      }
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUsername("");
      setUtenteId(null);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !utenteId) {
      setAlimentiSelezionati([]);
      return;
    }

    fetch(
      `http://localhost:8080/api/pasti?utenteId=${utenteId}&data=${dataISO}`
    )
      .then((res) => res.json())
      .then((dati) => {
        const pastiAdattati = dati.map((pasto) => ({
          ...pasto.alimentoId,
          quantita: pasto.grammi,
          pastoId: pasto._id,
        }));
        setAlimentiSelezionati(pastiAdattati);
      })
      .catch(() => setAlimentiSelezionati([]));
  }, [isLoggedIn, utenteId]);

  const aggiungiAlimento = async (alimento) => {
    const nuovo = { ...alimento, quantita: 100 };

    if (!utenteId) {
      setAlimentiSelezionati((prev) => [...prev, nuovo]);
      setQuery("");
      setRisultati([]);
      return;
    }

    if (isLoggedIn && utenteId) {
      await fetch("http://localhost:8080/api/pasti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          utenteId: utenteId.toString(),
          alimentoId: alimento._id,
          data: dataISO,
          grammi: 100,
        }),
      });
    }

    setAlimentiSelezionati((prev) => [...prev, nuovo]);
    setQuery("");
    setRisultati([]);
  };

  const aggiornaQuantita = async (index, nuovaQuantita) => {
    setAlimentiSelezionati((prev) => {
      const aggiornato = [...prev];
      aggiornato[index] = { ...aggiornato[index], quantita: nuovaQuantita };
      return aggiornato;
    });

    if (isLoggedIn && utenteId) {
      const alimento = alimentiSelezionati[index];
      if (!alimento || !alimento.pastoId) return;

      try {
        await fetch("http://localhost:8080/api/pasti/update-quantita", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pastoId: alimento.pastoId,
            grammi: nuovaQuantita,
          }),
        });
      } catch (err) {
        console.error("Errore nell'aggiornamento quantità:", err);
      }
    }
  };

  const rimuoviAlimento = async (index) => {
    const alimento = alimentiSelezionati[index];
    if (!alimento) return;

    if (isLoggedIn && utenteId && alimento.pastoId) {
      await fetch(`http://localhost:8080/api/pasti/${alimento.pastoId}`, {
        method: "DELETE",
      });
    }

    setAlimentiSelezionati((prev) => prev.filter((_, i) => i !== index));
  };

  const totale = alimentiSelezionati.reduce(
    (acc, alimento) => {
      const q = alimento.quantita / 100;
      return {
        proteine: acc.proteine + q * parseFloat(alimento["Proteine (g)"] || 0),
        grassi: acc.grassi + q * calcolaGrassi(alimento),
        calorie:
          acc.calorie +
          q * parseFloat(alimento["Energia, calorie (kcal)"] || 0),
        carboidrati:
          acc.carboidrati +
          q * parseFloat(alimento["Glucidi, disponibili (g)"] || 0),
      };
    },
    { proteine: 0, grassi: 0, calorie: 0, carboidrati: 0 }
  );

  const cerca = useCallback(
    debounce(async (val) => {
      if (!val) {
        setRisultati([]);
        setErrore(null);
        return;
      }

      if (val.length < 3) {
        setErrore("⚠️ Digita almeno 3 lettere per iniziare la ricerca.");
        setRisultati([]);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8080/api/alimenti/cerca?nome=${encodeURIComponent(
            val
          )}`
        );
        const data = await res.json();

        if (data.length === 0) {
          setRisultati([]);
          setErrore("Nessun alimento trovato");
        } else {
          setRisultati(data);
          setErrore(null);
        }
      } catch (err) {
        setErrore("Errore nella richiesta.");
        setRisultati([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    cerca(query);
  }, [query, cerca]);

  return (
    <div className="calcolo">
      <div className="contenitore">
        <div className="barra">
          <h2>Piano Alimentare Giornaliero</h2>
          <p className="descrizione">
            Cerca un alimento e aggiungilo al tuo piano di oggi. Modifica i
            grammi o rimuovilo. Il totale nutrizionale si aggiorna in tempo
            reale.
          </p>

          <input
            type="search"
            id="search"
            name="search"
            className="txt"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Es. agnello"
          />
          {errore && <p className="errore">{errore}</p>}

          {risultati.length > 0 && (
            <ul className="listaAlimenti">
              {risultati.map((alimento, index) => (
                <li key={alimento._id || index} className="nomeAlimento">
                  {alimento.Nome}
                  <button
                    onClick={() => aggiungiAlimento(alimento)}
                    className="btn-aggiungi"
                  >
                    ➕ Aggiungi
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="contenuto">
          <div className="lista">
            <h3>Alimenti Selezionati</h3>
            <ul>
              {alimentiSelezionati.map((alimento, index) => {
                const q = alimento.quantita / 100;
                const proteine = q * parseFloat(alimento["Proteine (g)"] || 0);
                const grassi = q * calcolaGrassi(alimento);
                const calorie =
                  q * parseFloat(alimento["Energia, calorie (kcal)"] || 0);
                const carboidrati =
                  q * parseFloat(alimento["Glucidi, disponibili (g)"] || 0);

                return (
                  <li key={index} className="item-alimento">
                    <div className="top">
                      <strong>{alimento.Nome}</strong>
                      <button
                        onClick={() => rimuoviAlimento(index)}
                        className="btn-rimuovi"
                        title="Rimuovi alimento"
                      >
                        ❌
                      </button>
                    </div>
                    <div className="input-group">
                      <input
                        type="number"
                        min="0"
                        step="10"
                        value={alimento.quantita}
                        onChange={(e) =>
                          aggiornaQuantita(
                            index,
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                      <span>g</span>
                    </div>
                    <div className="info-nutrizionali">
                      🥩 Proteine: {proteine.toFixed(1)}g<br />
                      🥓 Grassi: {grassi.toFixed(1)}g<br />
                      🍞 Carboidrati: {carboidrati.toFixed(1)}g<br />
                      🔥 Calorie: {calorie.toFixed(1)}kcal
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="resoconto">
            <h3>Resoconto Nutrizionale</h3>
            <ul>
              <li>🔥 Calorie: {totale.calorie.toFixed(1)} kcal</li>
              <li>🥩 Proteine: {totale.proteine.toFixed(1)} g</li>
              <li>🥓 Grassi: {totale.grassi.toFixed(1)} g</li>
              <li>🍞 Carboidrati: {totale.carboidrati.toFixed(1)} g</li>
            </ul>
            <button onClick={() => navigate("/")} className="btn-torna">
              ⬅ Torna alla Home
            </button>
            {isLoggedIn && (
              <button
                onClick={() => navigate("/storico")}
                className="btn-storico"
              >
                📅 Vai allo Storico
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calcolo;
