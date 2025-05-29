import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import "./Divsearch.css";
import { Link } from "react-router-dom";
import DatiAlimento from "./DatiAlimento";
function Divsearch() {
  const [query, setQuery] = useState("");
  const [risultati, setRisultati] = useState([]);
  const [errore, setErrore] = useState(null);

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
    <div className="searchBox">
      <video autoPlay muted loop className="backgroundVideo">
        <source src="/src/assets/video/donnaFitnes.mp4" type="video/mp4" />
        Il tuo browser non supporta il video.
      </video>

      <div className="searchContent">
        <h2>Il motore di ricerca per perdere peso</h2>
        <p className="grande">
          Scopri quante <strong>calorie</strong> e quanti{" "}
          <strong>nutrienti</strong> ci sono in un
          <strong> alimento</strong>, un <strong>piatto</strong>, un{" "}
          <strong>pasto</strong> o una <strong>dieta</strong>.
        </p>

        <div id="barraDiRicerca">
          <div>
            <label htmlFor="search" className="structural">
              Cerca un cibo
            </label>
          </div>
          <div>
            <input
              type="search"
              id="search"
              name="search"
              className="txt"
              size="20"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Es. agnello"
            />
          </div>
        </div>

        {errore && <p className="errore">{errore}</p>}

        {risultati.length > 0 && (
          <ul className="listaAlimenti">
            {risultati.map((alimento) => (
              <li key={alimento._id} className="nomeAlimento">
                <Link
                  to={`/datiAlimento/${encodeURIComponent(alimento.Nome)}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {alimento.Nome}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Divsearch;
