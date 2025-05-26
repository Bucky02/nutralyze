import { useEffect, useState } from "react";

function Alimenti() {
  const [alimenti, setAlimenti] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/alimenti") // chiamata alla tua API
      .then((res) => res.json())
      .then((data) => {
        console.log("Dati ricevuti dal server:", data);
        setAlimenti(data);
      })
      .catch((err) => console.error("Errore nel fetch:", err));
  }, []);

  return (
    <div>
      <h2>Lista Alimenti</h2>
      <ul>
        {alimenti.map((alimento, index) => (
          <li key={index}>{alimento.Nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default Alimenti;
