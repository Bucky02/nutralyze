import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("utente");
    navigate("/accedi"); // o dove vuoi mandare dopo logout
  };

  return (
    <button onClick={handleLogout} className="login-button">
      Logout
    </button>
  );
}

export default Logout;
