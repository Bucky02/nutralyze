import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="bottom-footer">
      <p>© 2025 Pauzano&Esposito. Tutti i diritti riservati.</p>
      <nav className="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Termini e condizioni</a>
        <a href="/contatti">Contatti</a>
      </nav>
      <div className="footer-social">
        <span>Seguici su:</span>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          Facebook
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          Instagram
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

export default Footer;
