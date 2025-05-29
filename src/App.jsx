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

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      {location.pathname !== "/accedi" && <Header />}
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="main-layout">
                <NutritionalTips /> {/* curiosità in alto */}
                <RecipesRecommended />
                <div className="cards-row">
                  <Search /> {/* card con video di sfondo */}
                  <Diary /> {/* seconda card con button e video */}
                </div>
              </div>
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
