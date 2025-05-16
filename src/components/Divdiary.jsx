import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Divdiary.css";

function Divdiary() {
  const navigate = useNavigate();

  const [currentVideo, setCurrentVideo] = useState(0); // 0 o 1
  const videos = [
    "/src/assets/video/video1.mp4",
    "/src/assets/video/video3.mp4",
    "/src/assets/video/video4.mp4",
  ];

  const videoRef = useRef(null);

  // Quando un video finisce, cambio video
  const handleEnded = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Ricarica il video corrente
      videoRef.current.play(); // Lo fa partire
    }
  }, [currentVideo]);

  const handleClick = () => {
    navigate("/calcolo");
  };

  return (
    <div className="diaryBox">
      <p id="paraDiary">
        Vuoi sapere quante calorie, proteine, carboidrati e grassi assumi in un
        pasto? Clicca il pulsante qui sotto per creare la tua lista di alimenti
        e calcolare i valori nutrizionali complessivi in base alle quantità
        scelte.
      </p>

      {/* Div unico per video con alternanza */}
      <div className="videoWrapper">
        <video
          ref={videoRef}
          onEnded={handleEnded}
          autoPlay
          muted
          playsInline
          controls={false}
          className="videoItem"
        >
          <source src={videos[currentVideo]} type="video/mp4" />
          Il tuo browser non supporta il video.
        </video>
      </div>

      <button onClick={handleClick}>Vai al Calcolo</button>
    </div>
  );
}

export default Divdiary;
