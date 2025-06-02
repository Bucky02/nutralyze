import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DatiAlimento.css";
import BadgeNutrizionali from "./BadgeNutrizionali"; // se usi export default
import GraficoNutrizionale from "./GraficoNutrizionale";

function DatiAlimento() {
  const { nome } = useParams();
  const [dati, setDati] = useState(null);
  const [errore, setErrore] = useState(null);

  const campi = {
    "Energia, kilojoules (kJ)":
      "Energia totale fornita dall’alimento, espressa in kilojoule.",
    "Energia, calorie (kcal)":
      "Energia totale fornita dall’alimento, espressa in chilocalorie.",
    "Lipidi, totali (g)": "Quantità totale di grassi presenti nell’alimento.",
    "Acidi grassi, saturi (g)":
      "Tipo di grassi considerati meno salutari, da limitare.",
    "Acidi grassi, monoinsaturi (g)":
      "Grassi buoni per il cuore, come quelli dell’olio d’oliva.",
    "Acidi grassi, polinsaturi (g)":
      "Grassi essenziali come omega-3 e omega-6.",
    "Colesterolo (mg)":
      "Sostanza lipidica che può influire sulla salute cardiovascolare.",
    "Zuccheri (g)": "Quantità di zuccheri semplici contenuti nell’alimento.",
    "Glucidi, disponibili (g)":
      "Carboidrati disponibili pronti all’assorbimento.",
    "Amido (g)": "Forma complessa di carboidrato, spesso presente nei cereali.",
    "Fibra alimentare (g)":
      "Importante per la digestione e la salute intestinale.",
    "Proteine (g)": "Nutriente essenziale per muscoli e tessuti.",
    "Sale (NaCl) (g)": "Quantità di sale da cucina totale.",
    "Alcool (g)": "Presenza di alcol, solitamente assente nei cibi normali.",
    "Acqua (g)": "Percentuale di acqua contenuta nell’alimento.",
    "Attività di vitamina A, RE (µg-RE)":
      "Vitamina utile per vista e sistema immunitario.",
    "Attività di vitamina A, RAE (µg-RE)":
      "Altro modo per esprimere l’attività della vitamina A.",
    "Attività di beta-carotene (µg-BCE)": "Precursore della vitamina A.",
    "Beta-carotene (µg)":
      "Pigmento vegetale, antiossidante e precursore della vitamina A.",
    "Vitamina B1 (tiamina) (mg)":
      "Vitamina del gruppo B, importante per l’energia.",
    "Vitamina B2 (riboflavina) (mg)":
      "Aiuta la produzione di energia e la salute della pelle.",
    "Vitamina B6 (piridossina) (mg)":
      "Importante per il metabolismo delle proteine.",
    "Vitamina B12 (cobalamina) (µg)":
      "Essenziale per la formazione dei globuli rossi.",
    "Niacina (mg)": "Vitamina B3, essenziale per il metabolismo energetico.",
    "Folati (µg)": "Fondamentali per la sintesi del DNA.",
    "Acido pantotenico (mg)": "Contribuisce alla produzione di energia.",
    "Vitamina C (acido ascorbico) (mg)":
      "Antiossidante e supporto immunitario.",
    "Vitamina D (calciferolo) (µg)":
      "Essenziale per ossa e assorbimento del calcio.",
    "Vitamina E (α-tocoferolo) (mg)": "Antiossidante che protegge le cellule.",
    "Potassio (K) (mg)": "Minerale essenziale per muscoli e nervi.",
    "Sodio (Na) (mg)": "Minerale legato alla pressione sanguigna.",
    "Cloro (Cl) (mg)": "Aiuta la digestione e l’equilibrio idrico.",
    "Calcio (Ca) (mg)": "Fondamentale per ossa e denti.",
    "Magnesio (Mg) (mg)": "Per muscoli, nervi e metabolismo.",
    "Fosforo (P) (mg)": "Forma ossa e partecipa al metabolismo.",
    "Ferro (Fe) (mg)": "Trasporta ossigeno nel sangue.",
    "Iodio (I) (µg)": "Essenziale per la tiroide.",
    "Zinco (Zn)  (mg)": "Importante per il sistema immunitario.",
    "Selenio (Se) (µg)":
      "Minerale con funzione antiossidante e supporto immunitario.",
  };

  useEffect(() => {
    const fetchDati = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/alimenti/cerca?nome=${encodeURIComponent(
            nome
          )}`
        );
        const json = await res.json();
        if (json.length === 0) {
          setErrore("❌ Alimento non trovato.");
        } else {
          setDati(json[0]);
        }
      } catch (err) {
        setErrore("Errore nel recupero dei dati.");
      }
    };

    fetchDati();
  }, [nome]);

  if (errore) return <p>{errore}</p>;
  if (!dati) return <p>Caricamento...</p>;

  return (
    <div className="scheda-alimento">
      <h1>{dati.Nome}</h1>
      <section className="sezione-categoria">
        <h2>Informazioni Generali</h2>
        <div className="categoria-contenuto">
          <p>
            <strong>Categoria:</strong> {dati.Categoria}
          </p>
        </div>
      </section>

      {/* Sezione contenitore per grafico e badge */}
      <section className="riga-superiore">
        {/* Sezione grafico */}
        <div className="sezione-grafico">
          <h2>Composizione Nutrizionale</h2>
          <GraficoNutrizionale dati={dati} />
        </div>

        {/* Sezione badge */}
        <div className="sezione-badge">
          <h2>Badge Nutrizionali</h2>
          <BadgeNutrizionali dati={dati} />
        </div>
      </section>

      {/* Sezione dettagli */}
      <section className="sezione-statistiche">
        <h2>Statistiche Dettagliate</h2>
        {Object.entries(campi).map(([campo, descrizione]) => (
          <div className="riga-dato" key={campo}>
            <span className="etichetta">{campo}:</span>
            <span className="valore">{dati[campo] ?? "-"}</span>
            <div className="tooltip">{descrizione}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default DatiAlimento;
