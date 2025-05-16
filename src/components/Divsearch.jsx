import "./Divsearch.css";

function Divsearch() {
  return (
    <div className="searchBox">
      <h2>Il motore di ricerca per perdere peso</h2>
      <p className="grande">
        Scopri quante <strong>calorie</strong> e quanti{" "}
        <strong>nutrienti</strong> ci sono in un
        <strong> alimento</strong>, un <strong>piatto</strong>, un{" "}
        <strong>pasto</strong> o una <strong>dieta</strong>.
      </p>
      <p className="picc">
        Decidi se vuoi{" "}
        <strong>
          "contare" proteine, grassi, zuccheri, fibra ed energia contenuti
        </strong>{" "}
        in un alimento o una ricetta oppure tutti i macronutrienti di un
        determinato cibo.
      </p>
      <div id="barraDiRicerca">
        <div>
          <label htmlFor="search" className="structural">
            Cerca un cibo
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
          <input type="submit" className="btn" value="Cerca" />
        </div>
      </div>
    </div>
  );
}

export default Divsearch;
