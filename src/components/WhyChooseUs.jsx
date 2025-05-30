import React from "react";
import "./WhyChooseUs.css";

const FeaturesOnly = () => {
  return (
    <section className="why-section">
      <h2 className="why-title">🔍 Funzionalità chiave in breve</h2>
      <div className="features-container">
        <Feature icon="🔎" text="Cerca un alimento e scopri i suoi nutrienti" />
        <Feature
          icon="🍽️"
          text="Ricette sane e gustose sempre a portata di mano"
        />
        <Feature
          icon="🧮"
          text="Calcola calorie, proteine e carboidrati dei tuoi pasti"
        />
        <Feature icon="📈" text="Monitora i tuoi progressi giorno per giorno" />
        <Feature
          icon="🔄"
          text="Funzionalità aggiornate e nuove costantemente"
        />
      </div>
    </section>
  );
};

const Feature = ({ icon, text }) => (
  <div className="feature">
    <span className="feature-icon">{icon}</span>
    <p className="feature-text">{text}</p>
  </div>
);

export default FeaturesOnly;
