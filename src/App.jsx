import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Divsearch";
import Diary from "./components/Divdiary";
import Calcolo from "./components/Calcolo";
import Accedi from "./components/Accedi";
import Registrazione from "./components/Registrazione";
import DatiAlimento from "./components/DatiAlimento";
import Footer from "./components/Footer";
import NutritionalTips from "./components/NutritionalTips";
import RecipesRecommended from "./components/RecipesRecommended";
import WhyChooseUs from "./components/WhyChooseUs";
import Banner from "./components/Banner";
import Admin from "./components/Admin";
import AggiungiProdotto from "./components/AggiungiProdotto";
import RimuoviProdotto from "./components/RimuoviProdotto";

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      {/* Se siamo in homepage mostra Banner,in alcuni nulla, altrimenti Header */}
      {![
        "/",
        "/accedi",
        "/registrazione",
        "/admin",
        "/aggiungiProdotto",
        "/rimuoviProdotto",
      ].includes(location.pathname) ? (
        <Header />
      ) : location.pathname === "/" ? (
        <Banner />
      ) : null}

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
          <Route path="/registrazione" element={<Registrazione />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/aggiungiProdotto" element={<AggiungiProdotto />} />
          <Route path="/rimuoviProdotto" element={<RimuoviProdotto />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
