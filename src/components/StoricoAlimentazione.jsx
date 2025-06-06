import React, { useEffect, useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./StoricoAlimentazione.css";

function StoricoAlimentazione() {
  const [dataSelezionata, setDataSelezionata] = useState(new Date());
  const [vistaSettimanale, setVistaSettimanale] = useState(false);
  const [pasti, setPasti] = useState([]);
  const [dateConPasti, setDateConPasti] = useState(new Set());
  const [noteGiornata, setNoteGiornata] = useState("");
  const [totali, setTotali] = useState({ calorie: 0, grassiSaturi: 0 });
  const [editingNota, setEditingNota] = useState(false);
  const [notaId, setNotaId] = useState(null);

  const utente = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("utente"));
    } catch {
      return null;
    }
  }, []);

  // Utility formattazione data YYYY-MM-DD senza shift timezone
  function formatDateLocal(date) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const settimanaDate = useMemo(() => {
    const start = new Date(dataSelezionata);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // lunedì come primo giorno
    const lunedi = new Date(start.setDate(diff));
    let giorni = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(lunedi);
      d.setDate(lunedi.getDate() + i);
      giorni.push(d);
    }
    return giorni;
  }, [dataSelezionata]);

  // Carica tutte le date con pasti per evidenziare nel calendario
  useEffect(() => {
    if (!utente?.id) return;
    fetch(`http://localhost:8080/api/pasti/date?utenteId=${utente.id}`)
      .then((res) => res.json())
      .then((dates) => setDateConPasti(new Set(dates)))
      .catch(console.error);
  }, [utente]);

  // Carica pasti per giorno o settimana
  useEffect(() => {
    if (!utente?.id) return;

    if (vistaSettimanale) {
      Promise.all(
        settimanaDate.map((d) => {
          const dataISO = formatDateLocal(d);
          return fetch(
            `http://localhost:8080/api/pasti?utenteId=${utente.id}&data=${dataISO}`
          )
            .then((res) => res.json())
            .then((pastiGiorno) => ({ data: dataISO, pasti: pastiGiorno }))
            .catch(() => ({ data: dataISO, pasti: [] }));
        })
      ).then((settimanaPasti) => {
        setPasti(settimanaPasti);
        calcolaTotali(settimanaPasti);
      });
    } else {
      const dataISO = formatDateLocal(dataSelezionata);
      fetch(
        `http://localhost:8080/api/pasti?utenteId=${utente.id}&data=${dataISO}`
      )
        .then((res) => res.json())
        .then((dati) => {
          setPasti(dati);
          calcolaTotali([{ pasti: dati }]);
        })
        .catch(console.error);
    }
  }, [dataSelezionata, utente, vistaSettimanale, settimanaDate]);

  // Carica nota giorno attuale solo se NON in vista settimanale
  useEffect(() => {
    if (!utente?.id || vistaSettimanale) return;

    const dataISO = formatDateLocal(dataSelezionata);
    fetch(
      `http://localhost:8080/api/note?utenteId=${utente.id}&data=${dataISO}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Nessuna nota trovata");
        return res.json();
      })
      .then((nota) => {
        setNoteGiornata(nota.testo);
        setNotaId(nota._id); // 👈 salva l’id della nota
      })
      .catch(() => setNoteGiornata(""));
    setEditingNota(false);
  }, [dataSelezionata, vistaSettimanale, utente]);

  function calcolaTotali(data) {
    let calorie = 0;
    let grassiSaturi = 0;
    data.forEach((giorno) => {
      const pastiGiorno = giorno.pasti || giorno;
      pastiGiorno.forEach((pasto) => {
        calorie +=
          parseFloat(pasto.alimentoId?.["Energia, calorie (kcal)"] || 0) *
          (pasto.grammi / 100);
        grassiSaturi +=
          parseFloat(pasto.alimentoId?.["Acidi grassi, saturi (g)"] || 0) *
          (pasto.grammi / 100);
      });
    });
    setTotali({ calorie, grassiSaturi });
  }

  async function eliminaNota() {
    if (!utente?.id || !notaId) return alert("Devi essere loggato");

    try {
      const res = await fetch(`http://localhost:8080/api/note/${notaId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Errore nell'eliminazione");
      alert("Nota eliminata");
      setNoteGiornata("");
      setNotaId(null);
    } catch (err) {
      alert("Errore: " + err.message);
    }
  }

  async function salvaNota() {
    if (!utente?.id) return alert("Devi essere loggato");

    const testoPulito = noteGiornata.trim();
    if (!testoPulito) return alert("La nota non può essere vuota");

    const dataISO = formatDateLocal(dataSelezionata);

    try {
      const res = await fetch("http://localhost:8080/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          utenteId: utente.id,
          data: dataISO,
          testo: testoPulito,
        }),
      });

      if (!res.ok) throw new Error("Errore nel salvataggio");

      const notaSalvata = await res.json(); // Prendi la risposta, che dovrebbe contenere l'ID della nota
      setNotaId(notaSalvata._id); // Aggiorna subito lo stato con l'ID della nuova nota

      alert("Nota salvata!");
      setEditingNota(false);
    } catch (err) {
      alert("Errore: " + err.message);
    }
  }
  return (
    <div className="storico">
      <h2>📅 Diario Alimentare</h2>

      <Calendar
        onChange={setDataSelezionata}
        value={dataSelezionata}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const dayISO = formatDateLocal(date);
            return dateConPasti.has(dayISO) ? "has-pasto" : "no-pasto";
          }
          return null;
        }}
      />
      <div className="controlli">
        <button onClick={() => setVistaSettimanale(!vistaSettimanale)}>
          {vistaSettimanale ? "Vista Giornaliera" : "Vista Settimanale"}
        </button>
      </div>

      {!vistaSettimanale && (
        <>
          <h3>🧾 Pasti del {dataSelezionata.toLocaleDateString()}</h3>
          {pasti.length === 0 ? (
            <p>Nessun alimento registrato per questa data.</p>
          ) : (
            <ul className="lista-pasti">
              {pasti.map((pasto, i) => (
                <li key={i} className="card-pasto">
                  <strong>
                    {pasto.alimentoId?.Nome || "Alimento sconosciuto"}
                  </strong>{" "}
                  – {pasto.grammi}g
                  <br />
                  Calorie: {pasto.alimentoId?.["Energia, calorie (kcal)"] ||
                    0}{" "}
                  kcal | Grassi saturi:{" "}
                  {pasto.alimentoId?.["Acidi grassi, saturi (g)"] || 0} g
                </li>
              ))}
            </ul>
          )}

          {/* POST-IT con la nota */}
          {noteGiornata && !editingNota && (
            <div className="postit-note">
              <h4 className="note-title">📝 Nota del giorno</h4>
              <p>{noteGiornata}</p>
              <div className="note-buttons">
                <button
                  className="btn-modifica"
                  onClick={() => setEditingNota(true)}
                >
                  Modifica Nota
                </button>
                <button className="btn-cancella" onClick={eliminaNota}>
                  ❌ Elimina Nota
                </button>
              </div>
            </div>
          )}

          {/* Box modifica nota */}
          {editingNota && (
            <div className="edit-note-box">
              <h4>Modifica Nota per {dataSelezionata.toLocaleDateString()}</h4>
              <textarea
                value={noteGiornata}
                onChange={(e) => setNoteGiornata(e.target.value)}
                rows={5}
                placeholder="Scrivi la tua nota qui..."
              />
              <div className="btn-group">
                <button onClick={salvaNota}>Salva Nota</button>
                <button onClick={() => setEditingNota(false)}>Annulla</button>
              </div>
            </div>
          )}

          {/* Pulsante per aggiungere nota se non ce n'è e non si sta modificando */}
          {!noteGiornata && !editingNota && pasti.length > 0 && (
            <button
              onClick={() => setEditingNota(true)}
              className="btn-add-note"
              type="button"
            >
              + Aggiungi Nota per il giorno
            </button>
          )}
        </>
      )}

      {vistaSettimanale && (
        <>
          <h3>
            🧾 Pasti della settimana ({settimanaDate[0].toLocaleDateString()} –{" "}
            {settimanaDate[6].toLocaleDateString()})
          </h3>
          {pasti.map(({ data, pasti: pasti2 = [] }, idx) => (
            <div key={idx} className="giorno-settimana">
              <h4>{new Date(data).toLocaleDateString()}</h4>
              {pasti2.length === 0 ? (
                <p>Nessun alimento registrato.</p>
              ) : (
                <ul>
                  {pasti2.map((pasto, i) => (
                    <li key={i} className="card-pasto">
                      <strong>{pasto.alimentoId.Nome}</strong> – {pasto.grammi}g
                      <br />
                      Calorie: {
                        pasto.alimentoId["Energia, calorie (kcal)"]
                      }{" "}
                      kcal | Grassi saturi:{" "}
                      {pasto.alimentoId["Acidi grassi, saturi (g)"]} g
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      <button className="btn-home" onClick={() => (window.location.href = "/")}>
        ⬅ Torna alla Home
      </button>
    </div>
  );
}

export default StoricoAlimentazione;
