import { Routes, Route, useLocation } from "react-router-dom";
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
import StoricoAlimentazione from "./components/StoricoAlimentazione";

function App() {
  const location = useLocation();
  const pathname = location.pathname;

  const isHomePage = pathname === "/";
  const isAdminPage = [
    "/admin",
    "/aggiungiProdotto",
    "/rimuoviProdotto",
  ].includes(pathname);
  const isLoginOrRegister = ["/accedi", "/registrazione"].includes(pathname);
  const isPaginaNotFound = pathname === "/paginaNonTrovata";

  const mostraHeader =
    !isHomePage && !isAdminPage && !isLoginOrRegister && !isPaginaNotFound;
  const mostraFooter = !isAdminPage && !isLoginOrRegister && !isPaginaNotFound;

  return (
    <div className="app-container">
      {/* Header (escluso dalla homepage e dalle pagine speciali) */}
      {mostraHeader && <Header />}

      <main className="main-content">
        <Routes>
          {/* Homepage: SOLO Banner + HomePage */}
          <Route
            path="/"
            element={
              <>
                <Banner />
                <HomePage />
              </>
            }
          />

          {/* Pagine pubbliche */}
          <Route path="/calcolo" element={<Calcolo />} />
          <Route path="/accedi" element={<Accedi />} />
          <Route path="/registrazione" element={<Registrazione />} />
          <Route path="/datiAlimento/:nome" element={<DatiAlimento />} />

          {/* Pagine protette (admin) */}
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

          {/* Pagine protette (utente loggato) */}
          <Route
            path="/storico"
            element={
              <PrivateRoute>
                <StoricoAlimentazione />
              </PrivateRoute>
            }
          />

          {/* Pagina 404 */}
          <Route path="/paginaNonTrovata" element={<PaginaNonTrovata />} />
          <Route path="*" element={<PaginaNonTrovata />} />
        </Routes>
      </main>

      {/* Footer visibile ovunque tranne login, registrazione, admin e 404 */}
      {mostraFooter && <Footer />}
    </div>
  );
}

export default App;
