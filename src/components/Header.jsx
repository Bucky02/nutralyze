import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header-container">
      <div className="header-logo-container">
        <Link to="/">
          <img src="/src/assets/logoIntero.png" alt="Logo Nutralyze" />
        </Link>
        <h1 className="header-site-title">Nutralyze</h1>
      </div>

      <div className="header-buttons-container">
        <Link to="/accedi">
          <button className="header-login-button">Accedi</button>
        </Link>

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
              <a href="#info1">Info 1</a>
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
