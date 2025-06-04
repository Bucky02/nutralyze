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
  const [dataCorrente, setDataCorrente] = useState(new Date());

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [utenteId, setUtenteId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dataISO = dataCorrente.toISOString().split("T")[0];

  useEffect(() => {
    const utente = localStorage.getItem("utente");

    if (token && utente) {
      try {
        const utenteObj = JSON.parse(utente);
        console.log("👤 utenteObj:", utenteObj);
        setUsername(utenteObj.username || "Utente");
        setUtenteId(utenteObj.id || null);
        console.log("✅ utenteId impostato a:", utenteObj.id);
      } catch (e) {
        console.warn("❌ Errore parsing utente:", e);
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

  const cambiaGiorno = (offset) => {
    const nuovaData = new Date(dataCorrente);
    nuovaData.setDate(nuovaData.getDate() + offset);
    setDataCorrente(nuovaData);
  };

  useEffect(() => {
    if (!isLoggedIn || !utenteId) {
      console.warn(
        "⚠️ Salto caricamento pasti: non loggato o utenteId mancante"
      );
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
          pastoId: pasto._id, // 👈 salvi anche ID del documento Pasto
        }));
        setAlimentiSelezionati(pastiAdattati);
      })

      .catch(() => setAlimentiSelezionati([]));
  }, [dataCorrente, isLoggedIn, utenteId]);

  const aggiungiAlimento = async (alimento) => {
    console.log("✅ Cliccato alimento:", alimento);

    const nuovo = { ...alimento, quantita: 100 };

    if (!utenteId) {
      setAlimentiSelezionati((prev) => [
        ...prev,
        { ...alimento, quantita: 100 }, // Default 100g
      ]);
      setQuery("");
      setRisultati([]);
      return;
    }

    if (isLoggedIn && utenteId) {
      console.log("🔐 Utente loggato, salvo pasto...");
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
    } else {
      console.warn("⚠️ Utente NON loggato o utenteId mancante!");
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
            pastoId: alimento.pastoId, // 👈 ora usi _id di `Pasto`
            grammi: nuovaQuantita,
          }),
        });
      } catch (err) {
        console.error("Errore nell'aggiornamento quantità:", err);
      }
    }
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
          navigate("/paginaNonTrovata", { replace: true });
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
        <div className="selezione-giorno">
          <button onClick={() => cambiaGiorno(-1)}>←</button>
          <span>{dataCorrente.toLocaleDateString()}</span>
          <button onClick={() => cambiaGiorno(1)}>→</button>
        </div>

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
        {!isLoggedIn && (
          <p className="errore">🔒 Accedi per salvare i tuoi progressi.</p>
        )}
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
