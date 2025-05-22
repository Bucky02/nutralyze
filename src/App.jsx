import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Divsearch";
import Diary from "./components/Divdiary";
import Prova from "./components/Prova";
import Accedi from "./components/Accedi";

function App() {
  return (
    <>
      <Header />
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
        <Route path="/prova" element={<Prova />} />
        <Route path="/accedi" element={<Accedi />} />
      </Routes>
    </>
  );
}

export default App;
