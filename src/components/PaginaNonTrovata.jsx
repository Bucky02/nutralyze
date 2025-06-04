import React from "react";
import { Link } from "react-router-dom";

function PaginaNonTrovata() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f0faf4", // verde chiaro soft
        color: "#2c6e49", // verde scuro naturale
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "900",
          marginBottom: "1rem",
          textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        404 - Pagina non trovata
      </h1>
      <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
        Ops! L’URL che hai inserito non esiste o è stata rimossa.
      </p>
      <Link
        to="/"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#4caf50", // verde brillante
          color: "#fff",
          borderRadius: "30px",
          textDecoration: "none",
          fontWeight: "700",
          boxShadow: "0 4px 8px rgba(76, 175, 80, 0.4)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#388e3c")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#4caf50")
        }
      >
        Torna alla Home
      </Link>
    </div>
  );
}

export default PaginaNonTrovata;
