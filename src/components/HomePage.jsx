import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NutritionalTips from "./NutritionalTips";
import Search from "./Divsearch";
import Diary from "./Divdiary";
import RecipesRecommended from "./RecipesRecommended";
import WhyChooseUs from "./WhyChooseUs";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const utente = JSON.parse(localStorage.getItem("utente"));
    if (utente?.ruolo === "admin") {
      // Se è admin, manda direttamente su /admin e sostituisci la pagina nella cronologia
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="main-layout">
      <div className="nutritionaltips">
        <NutritionalTips />
      </div>
      <div className="cards-row">
        <Search />
        <Diary />
      </div>
      <div className="divbox">
        <RecipesRecommended />
        <WhyChooseUs />
      </div>
    </div>
  );
}

export default HomePage;
