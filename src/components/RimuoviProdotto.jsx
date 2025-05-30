import "./RimuoviProdotto.css";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

function RimuoviProdotto() {
  const [query, setQuery] = useState("");
  const [risultati, setRisultati] = useState([]);
  const [errore, setErrore] = useState(null);

  // Funzione debounce per evitare chiamate eccessive
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

  return (
    <div className="barra">
      <label htmlFor="search" className="alimento">
        Cerca alimento da rimuovere
      </label>
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
            <li
              key={alimento._id || index}
              className="nomeAlimento"
              onClick={() => {
                // Qui inserirai la logica per eliminare
                console.log("Cliccato:", alimento.Nome);
              }}
            >
              {alimento.Nome}
            </li>
          ))}
        </ul>
      )}
      <div className="torna">
        <Link to="/admin">Torna alla home</Link>
      </div>
    </div>
  );
}

export default RimuoviProdotto;
