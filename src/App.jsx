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
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import HomePage from "./components/HomePage";

function App() {
  const location = useLocation();

  const adminRoutes = ["/admin", "/aggiungiProdotto", "/rimuoviProdotto"];

  return (
    <div className="app-container">
      {/* Header o Banner a seconda della pagina */}
      {!["/", "/accedi", "/registrazione", ...adminRoutes].includes(
        location.pathname
      ) ? (
        <Header />
      ) : location.pathname === "/" ? (
        <Banner />
      ) : null}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calcolo" element={<Calcolo />} />
          <Route path="/accedi" element={<Accedi />} />
          <Route path="/registrazione" element={<Registrazione />} />
          <Route path="/datiAlimento/:nome" element={<DatiAlimento />} />

          {/* Rotte protette per admin */}
          <Route
            path="/admin"
            element={
              <PrivateRouteAdmin>
                <Admin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/aggiungiProdotto"
            element={
              <PrivateRouteAdmin>
                <AggiungiProdotto />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/rimuoviProdotto"
            element={
              <PrivateRouteAdmin>
                <RimuoviProdotto />
              </PrivateRouteAdmin>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
