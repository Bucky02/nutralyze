import "./AggiungiProdotto.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AggiungiProdotto() {
  const navigate = useNavigate();

  const initialForm = {
    ID: "",
    Nome: "",
    Categoria: "",
    "Unità di riferimento": "",
    "Energia, kilojoules (kJ)": "",
    "Energia, calorie (kcal)": "",
    "Lipidi, totali (g)": "",
    "Acidi grassi, saturi (g)": "",
    "Acidi grassi, monoinsaturi (g)": "",
    "Acidi grassi, polinsaturi (g)": "",
    "Colesterolo (mg)": "",
    "Glucidi, disponibili (g)": "",
    "Zuccheri (g)": "",
    "Amido (g)": "",
    "Fibra alimentare (g)": "",
    "Proteine (g)": "",
    "Sale (NaCl) (g)": "",
    "Alcool (g)": "",
    "Acqua (g)": "",
    "Attività di vitamina A, RE (µg-RE)": "",
    "Attività di vitamina A, RAE (µg-RE)": "",
    "Attività di beta-carotene (µg-BCE)": "",
    "Beta-carotene (µg)": "",
    "Vitamina B1 (tiamina) (mg)": "",
    "Vitamina B2 (riboflavina) (mg)": "",
    "Vitamina B6 (piridossina) (mg)": "",
    "Vitamina B12 (cobalamina) (µg)": "",
    "Niacina (mg)": "",
    "Folati (µg)": "",
    "Acido pantotenico (mg)": "",
    "Vitamina C (acido ascorbico) (mg)": "",
    "Vitamina D (calciferolo) (µg)": "",
    "Vitamina E (α-tocoferolo) (mg)": "",
    "Potassio (K) (mg)": "",
    "Sodio (Na) (mg)": "",
    "Cloro (Cl) (mg)": "",
    "Calcio (Ca) (mg)": "",
    "Magnesio (Mg) (mg)": "",
    "Fosforo (P) (mg)": "",
    "Ferro (Fe) (mg)": "",
    "Iodio (I) (µg)": "",
    "Zinco (Zn)  (mg)": "",
    "Selenio (Se) (µg)": "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [submitError, setSubmitError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const convertToNumberIfPossible = (val) =>
      val === "" ? null : isNaN(val) ? val : Number(val);

    const datiDaInviare = {};
    for (const key in formData) {
      datiDaInviare[key] = convertToNumberIfPossible(formData[key]);
    }

    try {
      const response = await fetch("http://localhost:8080/api/alimenti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datiDaInviare),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(
          errData.message || "Errore nell'inserimento del prodotto"
        );
      }

      setShowModal(true);
      setFormData(initialForm);
    } catch (error) {
      setSubmitError(
        "Errore durante l'inserimento del prodotto: " + error.message
      );
    }
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        navigate("/admin");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showModal, navigate]);

  return (
    <>
      {/* 🔥 MODALE FUORI DAL CONTAINER */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>✅ Prodotto aggiunto con successo!</h3>
            <p>Verrai reindirizzato alla pagina admin...</p>
          </div>
        </div>
      )}

      {/* ✅ CONTAINER FORM */}
      <div className="registrazione-container">
        <h2>Aggiungi Prodotto</h2>

        {submitError && (
          <div role="alert" style={{ color: "red", marginBottom: "1rem" }}>
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-registrazione" noValidate>
          {Object.keys(formData).map((campo) => (
            <div
              key={campo}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              <label
                htmlFor={campo}
                style={{ fontWeight: "600", marginBottom: "5px" }}
              >
                {campo}
              </label>
              <input
                id={campo}
                name={campo}
                placeholder={campo}
                type={
                  campo.includes("kcal") ||
                  campo.includes("kJ") ||
                  campo === "ID"
                    ? "number"
                    : "text"
                }
                step="any"
                value={formData[campo]}
                onChange={handleChange}
                aria-invalid="false"
              />
            </div>
          ))}

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            Aggiungi
          </button>
        </form>

        <div className="torna" style={{ marginTop: "20px" }}>
          <Link to="/admin">Torna alla home</Link>
        </div>
      </div>
    </>
  );
}

export default AggiungiProdotto;
