import React, { useState } from "react";
import "./Divsearch.css";

function Divsearch() {
  const [query, setQuery] = useState("");
  const [risultato, setRisultato] = useState(null);
  const [errore, setErrore] = useState(null);

  // 🔍 Funzione per chiamare l’API
  const cerca = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/alimenti/cerca?nome=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();

      if (data.length === 0) {
        setErrore("❌ Nessun alimento trovato.");
        setRisultato(null);
      } else {
        setRisultato(data[0]);
        setErrore(null);
      }
    } catch (err) {
      setErrore("Errore nella richiesta.");
      setRisultato(null);
    }
  };

  return (
    <div className="searchBox">
      {/* 🎥 Video di sfondo */}
      <video autoPlay muted loop className="backgroundVideo">
        <source src="/src/assets/video/donnaFitnes.mp4" type="video/mp4" />
        Il tuo browser non supporta il video.
      </video>

      {/* 🔲 Contenuto sopra il video */}
      <div className="searchContent">
        <h2>Il motore di ricerca per perdere peso</h2>
        <p className="grande">
          Scopri quante <strong>calorie</strong> e quanti{" "}
          <strong>nutrienti</strong> ci sono in un
          <strong> alimento</strong>, un <strong>piatto</strong>, un{" "}
          <strong>pasto</strong> o una <strong>dieta</strong>.
        </p>
        <p className="picc">
          Decidi se vuoi{" "}
          <strong>
            "contare" proteine, grassi, zuccheri, fibra ed energia contenuti
          </strong>{" "}
          in un alimento o una ricetta oppure tutti i macronutrienti di un
          determinato cibo.
        </p>

        {/* 🔍 Barra di ricerca */}
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
            />
            <input
              type="submit"
              className="btn"
              value="Cerca"
              onClick={cerca}
            />
          </div>
        </div>

        {/* ⚠️ Messaggio di errore */}
        {errore && <p className="errore">{errore}</p>}

        {/* ✅ Risultato della ricerca */}
        {risultato && (
          <div className="risultatoBox">
            <h3>{risultato.Nome}</h3>
            <p>
              <strong>Categoria:</strong> {risultato.Categoria}
            </p>
            <p>
              <strong>Proteine:</strong> {risultato["Proteine (g)"]} g
            </p>
            <p>
              <strong>Calorie:</strong> {risultato["Energia, calorie (kcal)"]}{" "}
              kcal
            </p>
            <p>
              <strong>Acqua:</strong> {risultato["Acqua (g)"]} g
            </p>
            <p>
              <strong>Grassi saturi:</strong>{" "}
              {risultato["Acidi grassi, saturi (g)"]} g
            </p>
            <p>
              <strong>Zuccheri:</strong> {risultato["Zuccheri (g)"]} g
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Divsearch;
