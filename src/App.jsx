import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Divsearch";
import Diary from "./components/Divdiary";
import Calcolo from "./components/Calcolo";
import Accedi from "./components/Accedi";
import DatiAlimento from "./components/DatiAlimento";
import Footer from "./components/Footer";
import NutritionalTips from "./components/NutritionalTips";
import RecipesRecommended from "./components/RecipesRecommended";
import WhyChooseUs from "./components/WhyChooseUs";
import Banner from "./components/Banner";

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      {/* Se siamo in homepage mostra Banner, altrimenti Header */}
      {location.pathname === "/" ? <Banner /> : <Header />}

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Solo contenuto homepage, Banner già mostrato sopra */}
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
              </>
            }
          />
          <Route path="/calcolo" element={<Calcolo />} />
          <Route path="/accedi" element={<Accedi />} />
          <Route path="/datiAlimento/:nome" element={<DatiAlimento />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
