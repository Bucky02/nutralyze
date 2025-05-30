import "./Calcolo.css";
import React, { useState, useEffect, useCallback } from "react";

// Funzione debounce
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

  const grassiTotali = grassiSaturi + grassiMono + grassiPoli;
  return grassiTotali;
}

function Calcolo() {
  const [query, setQuery] = useState("");
  const [risultati, setRisultati] = useState([]);
  const [errore, setErrore] = useState(null);
  const [alimentiSelezionati, setAlimentiSelezionati] = useState([]);

  const aggiungiAlimento = (alimento) => {
    setAlimentiSelezionati((prev) => [
      ...prev,
      { ...alimento, quantita: 100 }, // Default 100g
    ]);
    setQuery("");
    setRisultati([]);
  };

  const aggiornaQuantita = (index, nuovaQuantita) => {
    setAlimentiSelezionati((prev) =>
      prev.map((alimento, i) =>
        i === index ? { ...alimento, quantita: nuovaQuantita } : alimento
      )
    );
  };

  const rimuoviAlimento = (index) => {
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
          q * parseFloat(alimento["Glucidi, disponibili (g)"]),
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
    <div className="calcolo">
      <div className="barra">
        <label htmlFor="search" className="alimento">
          Aggiungi un alimento
        </label>
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
        {errore && <p className="errore">{errore}</p>}
        {risultati.length > 0 && (
          <ul className="listaAlimenti">
            {risultati.map((alimento, index) => (
              <li
                key={alimento._id || index}
                className="nomeAlimento"
                onClick={() => aggiungiAlimento(alimento)}
              >
                {alimento.Nome}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="conto">
        <div className="lista">
          <h3>Lista alimenti</h3>
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
                <li key={index}>
                  <strong>{alimento.Nome}</strong>{" "}
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={alimento.quantita}
                    onChange={(e) =>
                      aggiornaQuantita(index, parseFloat(e.target.value) || 0)
                    }
                    style={{ width: "60px", marginLeft: "10px" }}
                  />
                  <span>g</span>
                  <button
                    onClick={() => rimuoviAlimento(index)}
                    className="btn-cestino"
                    title="Rimuovi alimento"
                  >
                    🗑️
                  </button>
                  <div className="info-nutrizionali">
                    Proteine: {proteine.toFixed(1)}g<br />
                    Grassi: {grassi.toFixed(1)}g<br />
                    Calorie: {calorie.toFixed(1)}kcal
                    <br />
                    Carboidrati: {carboidrati.toFixed(1)}g<br />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="resoconto">
          <h3>Resoconto calorie</h3>
          <ul>
            <li>Totale calorie: {totale.calorie.toFixed(1)} kcal</li>
            <li>Proteine: {totale.proteine.toFixed(1)} g</li>
            <li>Grassi: {totale.grassi.toFixed(1)} g</li>
            <li>Carboidrati: {totale.carboidrati.toFixed(1)}g </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Calcolo;
