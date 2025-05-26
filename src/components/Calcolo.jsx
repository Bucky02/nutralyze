import "./Calcolo.css";

function Calcolo() {
  return (
    <div className="calcolo">
      <div>
        <label htmlFor="search" className="alimento">
          Aggiungi un alimento
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
      <div className="conto">
        <div className="lista">
          <h3>Lista</h3>
          <ul>
            <li>—</li>
            <li>—</li>
            <li>—</li>
            <li>—</li>
            <li>—</li>
            <li>—</li>
            <li>—</li>
          </ul>
        </div>
        <div className="resoconto">
          <h3>Resoconto calorie</h3>
          <ul>
            <h3>Resoconto</h3>
            <p>Totale calorie: —</p>
            <p>Proteine: —</p>
            <p>Carboidrati: —</p>
            <p>Grassi: —</p>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Calcolo;
