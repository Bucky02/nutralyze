import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout"; // componente logout già esistente
import "./Banner.css";
import { TypeAnimation } from "react-type-animation";
import bannerFoto from "../assets/bannerfoto.jpg";

const Banner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, []);

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
    <div
      className="banner-background"
      style={{ position: "relative", backgroundImage: `url(${bannerFoto})` }}
    >
      <div className="banner-header-overlay">
        <div className="logo-container">
          <Link to="/">
            <img src="/src/assets/logoIntero.png" alt="Logo Nutralyze" />
          </Link>
        </div>

        <div className="buttons-container">
          {!isLogged ? (
            <>
              <Link to="/accedi">
                <button className="login-button">Accedi</button>
              </Link>
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
                    <Link to="/registrazione" onClick={() => setIsOpen(false)}>
                      Registrati
                    </Link>
                    <Link to="/calcolo" onClick={() => setIsOpen(false)}>
                      Calcolo
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Logout />
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
                    <Link to="/storico" onClick={() => setIsOpen(false)}>
                      Dati Utente
                    </Link>
                    <Link to="/calcolo" onClick={() => setIsOpen(false)}>
                      Calcolo
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
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
