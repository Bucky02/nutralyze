import React, { useState } from "react";
import "./UploadAlimento.css";

const campiRichiesti = [
  "ID",
  "Nome",
  "Categoria",
  "Unità di riferimento",
  "Energia, kilojoules (kJ)",
  "Energia, calorie (kcal)",
  "Lipidi, totali (g)",
  "Acidi grassi, saturi (g)",
  "Acidi grassi, monoinsaturi (g)",
  "Acidi grassi, polinsaturi (g)",
  "Colesterolo (mg)",
  "Glucidi, disponibili (g)",
  "Zuccheri (g)",
  "Amido (g)",
  "Fibra alimentare (g)",
  "Proteine (g)",
  "Sale (NaCl) (g)",
  "Alcool (g)",
  "Acqua (g)",
  "Attività di vitamina A, RE (µg-RE)",
  "Attività di vitamina A, RAE (µg-RE)",
  "Attività di beta-carotene (µg-BCE)",
  "Beta-carotene (µg)",
  "Vitamina B1 (tiamina) (mg)",
  "Vitamina B2 (riboflavina) (mg)",
  "Vitamina B6 (piridossina) (mg)",
  "Vitamina B12 (cobalamina) (µg)",
  "Niacina (mg)",
  "Folati (µg)",
  "Acido pantotenico (mg)",
  "Vitamina C (acido ascorbico) (mg)",
  "Vitamina D (calciferolo) (µg)",
  "Vitamina E (α-tocoferolo) (mg)",
  "Potassio (K) (mg)",
  "Sodio (Na) (mg)",
  "Cloro (Cl) (mg)",
  "Calcio (Ca) (mg)",
  "Magnesio (Mg) (mg)",
  "Fosforo (P) (mg)",
  "Ferro (Fe) (mg)",
  "Iodio (I) (µg)",
  "Zinco (Zn)  (mg)",
  "Selenio (Se) (µg)",
];

function UploadAlimento() {
  const [fileContent, setFileContent] = useState(null);

  const validaCampi = (json) => {
    for (const campo of campiRichiesti) {
      if (!(campo in json)) return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result);
        if (!validaCampi(json)) {
          alert("Mancano uno o più campi nel file JSON!");
          setFileContent(null);
          return;
        }
        setFileContent(json);
      } catch (err) {
        alert("File JSON non valido!");
        setFileContent(null);
      }
    };

    if (file) reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!fileContent) return alert("Carica prima un file JSON valido");

    try {
      const response = await fetch("/api/alimenti/caricaAlimento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fileContent),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Errore nel caricamento");
      } else {
        alert("Alimento caricato con successo!");
        setFileContent(null);
      }
    } catch (err) {
      alert("Errore di rete o server");
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Carica un alimento in formato JSON</h2>

      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="upload-input"
      />

      <button
        onClick={handleUpload}
        disabled={!fileContent}
        className={`upload-button ${!fileContent ? "disabled" : ""}`}
      >
        Carica Alimento
      </button>
    </div>
  );
}

export default UploadAlimento;
