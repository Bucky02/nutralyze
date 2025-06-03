import { Navigate } from "react-router-dom";

function PrivateRouteAdmin({ children }) {
  const utente = JSON.parse(localStorage.getItem("utente"));

  // Se NON c'è utente o NON è admin → torna alla home
  if (!utente || utente.ruolo !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRouteAdmin;
