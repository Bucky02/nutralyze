import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Divsearch";
import Diary from "./components/Divdiary";
import Calcolo from "./components/Calcolo";
import Accedi from "./components/Accedi";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/accedi" && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <div className="main-layout">
              <Search />
              <Diary />
            </div>
          }
        />
        <Route path="/calcolo" element={<Calcolo />} />
        <Route path="/accedi" element={<Accedi />} />
      </Routes>
    </>
  );
}

export default App;
