import { Link } from "react-router-dom";
import "./Accedi.css";

function Accedi() {
  return (
    <div className="body">
      <div id="barraDiRicerca">
        <div>
          <label htmlFor="search" className="email">
            Email
          </label>
        </div>
        <div>
          <input
            type="search"
            id="search"
            name="search"
            className="txt"
            size="20"
          />
        </div>
        <div>
          <label htmlFor="search" className="password">
            Password
          </label>
        </div>
        <div>
          <input
            type="search"
            id="search"
            name="search"
            className="txt"
            size="20"
          />
        </div>
        <input type="submit" className="btn" value="Accedi" />
        <div className="torna">
          <Link to="/">Torna alla home</Link>
        </div>
      </div>
    </div>
  );
}

export default Accedi;
