import React from "react";
import "./BadgeNutrizionali.css";

function BadgeNutrizionali({ dati }) {
  const badges = [];

  const proteine = Number(dati["Proteine (g)"]?.replace(",", ".") || 0);
  const grassiSaturi = Number(
    dati["Acidi grassi, saturi (g)"]?.replace(",", ".") || 0
  );
  const fibra = Number(dati["Fibra alimentare (g)"]?.replace(",", ".") || 0);
  const zuccheri = Number(dati["Zuccheri (g)"]?.replace(",", ".") || 0);
  const vitaminaC = Number(
    dati["Vitamina C (acido ascorbico) (mg)"]?.replace(",", ".") || 0
  );
  const potassio = Number(dati["Potassio (K) (mg)"]?.replace(",", ".") || 0);
  const sale = Number(dati["Sale (NaCl) (g)"]?.replace(",", ".") || 0);
  const ferro = Number(dati["Ferro (Fe) (mg)"]?.replace(",", ".") || 0);
  const calcio = Number(dati["Calcio (Ca) (mg)"]?.replace(",", ".") || 0);
  const kcal = Number(dati["Energia, calorie (kcal)"] ?? 0);

  if (kcal > 0 && kcal < 40)
    badges.push({
      label: "🥗 Basso contenuto calorico",
      className: "badge-calorie-basse",
    });
  else if (kcal >= 40 && kcal <= 120)
    badges.push({
      label: "🍽️ Moderato contenuto calorico",
      className: "badge-calorie-moderate",
    });
  else if (kcal > 120)
    badges.push({
      label: "🔥 Alto contenuto calorico",
      className: "badge-calorie-alte",
    });

  if (proteine >= 20)
    badges.push({ label: "💪 Ricco di proteine", className: "badge-proteine" });
  if (grassiSaturi <= 2)
    badges.push({
      label: "❤️ Basso contenuto di grassi saturi",
      className: "badge-grassi",
    });
  if (fibra >= 3)
    badges.push({ label: "🌾 Fonte di fibre", className: "badge-fibre" });
  if (zuccheri <= 5)
    badges.push({
      label: "🍬 Basso contenuto di zuccheri",
      className: "badge-zuccheri",
    });
  if (vitaminaC >= 10)
    badges.push({
      label: "🍊 Fonte di vitamina C",
      className: "badge-vitamina",
    });
  if (potassio >= 300)
    badges.push({ label: "🥔 Ricco di potassio", className: "badge-potassio" });
  if (sale <= 0.5)
    badges.push({
      label: "🧂 Basso contenuto di sale",
      className: "badge-sale",
    });
  if (ferro >= 1)
    badges.push({ label: "🩸 Fonte di ferro", className: "badge-ferro" });
  if (calcio >= 100)
    badges.push({ label: "🦴 Ricco di calcio", className: "badge-calcio" });

  return (
    <div style={{ marginTop: "1rem" }}>
      {badges.length === 0 ? (
        <p>Nessun badge nutrizionale da mostrare.</p>
      ) : (
        badges.map((badge, i) => (
          <span key={i} className={`badge-nutrizionale ${badge.className}`}>
            {badge.label}
          </span>
        ))
      )}
    </div>
  );
}

export default BadgeNutrizionali;
