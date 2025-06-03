import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // All'avvio verifica token e carica username
  useEffect(() => {
    const token = localStorage.getItem("token");
    const utente = localStorage.getItem("utente");
    if (token && utente) {
      setIsLoggedIn(true);
      try {
        const utenteObj = JSON.parse(utente);
        setUsername(utenteObj.username || "Utente");
      } catch {
        setUsername("Utente");
      }
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, []);

  // Chiude dropdown se clicchi fuori
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("utente");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  return (
    <div className="header-container">
      <div className="header-logo-container">
        <Link to="/">
          <img src="/src/assets/logoIntero.png" alt="Logo Nutralyze" />
        </Link>
        <h1 className="header-site-title">Nutralyze</h1>
      </div>

      <div className="header-buttons-container">
        {!isLoggedIn && (
          <Link to="/accedi">
            <button className="header-login-button">Accedi</button>
          </Link>
        )}

        {isLoggedIn && (
          <div
            className="user-info-container"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            {/* Pallino verde */}
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                backgroundColor: "green",
                borderRadius: "50%",
              }}
              title="Online"
            ></span>
            {/* Nome utente */}
            <span className="username-highlight">{username}</span>
            {/* Bottone logout */}
            <button className="header-login-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        <div className="header-dropdown" ref={dropdownRef}>
          <button
            className={`header-secondary-button ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className="header-hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {isOpen && (
            <div className="header-dropdown-content">
              {!isLoggedIn && <a href="/registrazione">Registrati</a>}
              <a href="#info2">Info 2</a>
              <a href="#info3">Info 3</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
