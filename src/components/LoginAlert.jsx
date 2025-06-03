import { useState, useEffect } from "react";

function LoginAlert({ message, duration = 3000 }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // sfondo scuro trasparente
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#4BB543",
          color: "white",
          padding: "20px 35px",
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          fontWeight: "bold",
          fontSize: "1.2rem",
          textAlign: "center",
        }}
      >
        {message}
      </div>
    </div>
  );
}

export default LoginAlert;
