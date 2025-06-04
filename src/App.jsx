import { Routes, Route, useLocation, useMatch } from "react-router-dom";
import "./App.css";

// Componenti
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
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./components/HomePage";
import PaginaNonTrovata from "./components/PaginaNonTrovata";

function App() {
  const location = useLocation();
  const isPaginaNotFound = useMatch("*")?.pathname === location.pathname;

  const adminRoutes = ["/admin", "/aggiungiProdotto", "/rimuoviProdotto"];
  const noHeaderRoutes = ["/accedi", "/registrazione", ...adminRoutes];

  return (
    <div className="app-container">
      {/* Banner sulla home */}
      {location.pathname === "/" && <Banner key={location.pathname} />}

      {/* Header su tutte le altre pagine tranne login/registrazione/admin/404 */}
      {location.pathname !== "/" &&
        !noHeaderRoutes.includes(location.pathname) &&
        !isPaginaNotFound && <Header />}

      <main className="main-content">
        <Routes>
          {/* Pubbliche */}
          <Route path="/" element={<HomePage />} />
          <Route path="/calcolo" element={<Calcolo />} />
          <Route path="/accedi" element={<Accedi />} />
          <Route path="/registrazione" element={<Registrazione />} />
          <Route path="/datiAlimento/:nome" element={<DatiAlimento />} />

          {/* Rotte protette solo per admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute ruoloRichiesto="admin">
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/aggiungiProdotto"
            element={
              <PrivateRoute ruoloRichiesto="admin">
                <AggiungiProdotto />
              </PrivateRoute>
            }
          />
          <Route
            path="/rimuoviProdotto"
            element={
              <PrivateRoute ruoloRichiesto="admin">
                <RimuoviProdotto />
              </PrivateRoute>
            }
          />

          {/* Pagina 404 */}
          <Route path="/paginaNonTrovata" element={<PaginaNonTrovata />} />
          <Route path="*" element={<PaginaNonTrovata />} />
        </Routes>
      </main>

      {/* Footer su tutte le altre pagine tranne login/registrazione/admin/404 */}
      {!noHeaderRoutes.includes(location.pathname) && !isPaginaNotFound && (
        <Footer />
      )}
    </div>
  );
}

export default App;
