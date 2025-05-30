import React, { useState, useEffect, useRef } from "react";
import "./Banner.css";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Chiude il menu se clicchi fuori
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="banner-background" style={{ position: "relative" }}>
      <div className="banner-header-overlay">
        <div className="logo-container">
          <a href="/">
            <img src="/src/assets/logoIntero.png" alt="Logo Nutralyze" />
          </a>
        </div>

        <div className="buttons-container">
          <a href="/accedi">
            <button className="login-button">Accedi</button>
          </a>

          <div className="dropdown" ref={dropdownRef}>
            <button
              className={`secondary-button ${isOpen ? "open" : ""}`}
              aria-label="Menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            {isOpen && (
              <div className="dropdown-content">
                <a href="#">Home</a>
                <a href="#">Profilo</a>
                <a href="#">Impostazioni</a>
                <a href="#">Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="banner-overlay">
        <h1 className="typing-title">NutrAlyze</h1>
        <TypeAnimation
          sequence={[
            "Analizza i tuoi alimenti.",
            2000,
            "Comprendi ciò che mangi.",
            2000,
            "Migliora la tua alimentazione.",
            2000,
            "Vivi meglio con NutrAlyze.",
            2500,
          ]}
          wrapper="p"
          speed={50}
          className="typing-paragraph"
          repeat={Infinity}
        />
      </div>
    </div>
  );
};

export default Banner;
