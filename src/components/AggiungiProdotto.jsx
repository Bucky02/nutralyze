import "./AggiungiProdotto.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function AggiungiProdotto() {
  const [formData, setFormData] = useState({
    nome: "",
    proteine: "",
    carboidrati: "",
    grassi: "",
    fibre: "",
    zuccheri: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui invii i dati al backend (es. con fetch o axios)
    console.log("Dati prodotto:", formData);
  };

  return (
    <div className="registrazione-container">
      <h2>Aggiungi Prodotto</h2>
      <form onSubmit={handleSubmit} className="form-registrazione">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
        />

        <input
          type="number"
          step="0.1"
          name="proteine"
          placeholder="Proteine (g)"
          value={formData.proteine}
          onChange={handleChange}
        />

        <input
          type="number"
          step="0.1"
          name="carboidrati"
          placeholder="Carboidrati (g)"
          value={formData.carboidrati}
          onChange={handleChange}
        />

        <input
          type="number"
          step="0.1"
          name="grassi"
          placeholder="Grassi (g)"
          value={formData.grassi}
          onChange={handleChange}
        />

        <input
          type="number"
          step="0.1"
          name="fibre"
          placeholder="Fibre (g)"
          value={formData.fibre}
          onChange={handleChange}
        />

        <input
          type="number"
          step="0.1"
          name="zuccheri"
          placeholder="Zuccheri (g)"
          value={formData.zuccheri}
          onChange={handleChange}
        />

        <button type="submit">Aggiungi</button>
      </form>

      <div className="torna">
        <Link to="/admin">Torna alla home</Link>
      </div>
    </div>
  );
}

export default AggiungiProdotto;
