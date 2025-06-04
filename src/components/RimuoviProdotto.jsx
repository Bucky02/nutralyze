import "./RimuoviProdotto.css";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Trash2, Search } from "lucide-react";

function RimuoviProdotto() {
  const [query, setQuery] = useState("");
  const [risultati, setRisultati] = useState([]);
  const [errore, setErrore] = useState(null);
  const [selezionato, setSelezionato] = useState(null);
  const [messaggio, setMessaggio] = useState("");

  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  const cerca = useCallback(
    debounce(async (val) => {
      if (!val) {
        setRisultati([]);
        setErrore(null);
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
          setErrore("❌ Nessun alimento trovato.");
          setRisultati([]);
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

  const eliminaAlimento = async () => {
    const conferma = window.confirm(
      `Sei sicuro di voler eliminare "${selezionato.Nome}"?`
    );
    if (!conferma) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/alimenti/${selezionato._id}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (res.ok) {
        setMessaggio(`✅ ${data.message}`);
        setSelezionato(null);
        setQuery("");
        setRisultati([]);
      } else {
        setMessaggio(`❌ Errore: ${data.message}`);
      }
    } catch (err) {
      setMessaggio("❌ Errore nella richiesta DELETE");
    }
  };

  return (
    <div className="rimuovi-container">
      <header className="page-header">
        <h2>
          <Trash2 size={24} /> Rimuovi alimento
        </h2>
        <p className="sottotitolo">
          Cerca un alimento e clicca per eliminarlo. ⚠️ Azione permanente.
        </p>
      </header>

      <div className="search-wrapper">
        <label htmlFor="search" className="alimento">
          <Search size={18} /> Cerca alimento
        </label>
        <input
          type="search"
          id="search"
          className="txt"
          placeholder="Inserisci il nome dell’alimento..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelezionato(null);
            setMessaggio("");
          }}
        />
      </div>

      {errore && <p className="errore">{errore}</p>}

      {risultati.length > 0 && (
        <ul className="listaAlimenti">
          {risultati.map((alimento) => (
            <li
              key={alimento._id}
              className={`nomeAlimento ${
                selezionato?._id === alimento._id ? "selezionato" : ""
              }`}
              onClick={() => {
                setSelezionato(alimento);
                setMessaggio("");
              }}
            >
              {alimento.Nome}
            </li>
          ))}
        </ul>
      )}

      {selezionato && (
        <div className="scheda-alimento1">
          <h3>
            🍽 Hai selezionato: <strong>{selezionato.Nome}</strong>
          </h3>
          <p>
            <strong>Calorie:</strong> {selezionato["Energia, calorie (kcal)"]}{" "}
            kcal
          </p>
          <p>
            <strong>Proteine:</strong> {selezionato["Proteine (g)"]} g
          </p>
          <p>
            <strong>Zuccheri:</strong> {selezionato["Zuccheri (g)"]} g
          </p>
          <button className="btn-elimina" onClick={eliminaAlimento}>
            <Trash2 size={16} /> Elimina definitivamente
          </button>
        </div>
      )}

      {messaggio && <p className="messaggio">{messaggio}</p>}

      <div className="torna">
        <Link to="/admin">⬅ Torna alla home</Link>
      </div>
    </div>
  );
}

export default RimuoviProdotto;
