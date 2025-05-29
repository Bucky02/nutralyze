import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./GraficoNutrizionale.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function GraficoNutrizionale({ dati }) {
  const proteine = Number(dati["Proteine (g)"]?.replace(",", ".") || 0);
  const carboidrati = Number(
    dati["Carboidrati disponibili (g)"]?.replace(",", ".") || 0
  );
  const grassi = Number(dati["Lipidi, totali (g)"]?.replace(",", ".") || 0);
  const fibra = Number(dati["Fibra alimentare (g)"]?.replace(",", ".") || 0);
  const zuccheri = Number(dati["Zuccheri (g)"]?.replace(",", ".") || 0);

  const data = {
    labels: ["Proteine", "Carboidrati", "Grassi", "Fibre", "Zuccheri"],
    datasets: [
      {
        label: "Composizione (%)",
        data: [proteine, carboidrati, grassi, fibra, zuccheri],
        backgroundColor: [
          "#4caf50",
          "#2196f3",
          "#ff9800",
          "#8bc34a",
          "#e91e63",
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="grafico-container">
      <div className="grafico-pie">
        <Pie data={data} options={options} />
      </div>
      <div className="grafico-legend">
        {data.labels.map((label, idx) => (
          <span
            key={idx}
            style={{ color: data.datasets[0].backgroundColor[idx] }}
          >
            ● {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default GraficoNutrizionale;
