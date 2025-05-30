import { Link } from "react-router-dom";
import "./Admin.css";
import AggiungiProdotto from "./AggiungiProdotto";
import RimuoviProdotto from "./RimuoviProdotto";

function Admin() {
  return (
    <div className="admin-container">
      <Link to="/aggiungiProdotto" className="admin-box">
        Aggiungi Prodotto
      </Link>
      <Link to="/rimuoviProdotto" className="admin-box">
        Elimina Prodotto
      </Link>
    </div>
  );
}

export default Admin;
