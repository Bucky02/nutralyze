import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children, ruoloRichiesto = null }) {
  const location = useLocation();
  const utente = JSON.parse(localStorage.getItem("utente"));

  // 🔒 Nessun utente → reindirizza a /accedi
  if (!utente) {
    return <Navigate to="/accedi" state={{ from: location }} replace />;
  }

  // ⛔ Utente loggato ma non ha il ruolo richiesto → reindirizza alla home
  if (ruoloRichiesto && utente.ruolo !== ruoloRichiesto) {
    return <Navigate to="/" replace />;
  }

  // ✅ Utente loggato e con ruolo corretto (o nessun ruolo richiesto) → accede alla pagina
  return children;
}

export default PrivateRoute;
