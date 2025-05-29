import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./NutritionalTips.css";

const tips = [
  "Sai che il kiwi contiene più vitamina C dell'arancia?",
  "Il consumo regolare di noci può migliorare la salute del cervello grazie agli antiossidanti.",
  "Bere acqua prima dei pasti può aiutarti a mangiare meno e perdere peso.",
  "Il peperoncino contiene capsaicina, che può aumentare temporaneamente il metabolismo.",
  "Le fibre solubili presenti in avena e legumi aiutano a ridurre il colesterolo LDL.",
  "Mangiare pesce grasso come il salmone aiuta la salute del cuore grazie agli omega-3.",
  "La vitamina D è fondamentale per l'assorbimento del calcio e la salute delle ossa.",
  "Alcune spezie come la curcuma hanno proprietà antinfiammatorie naturali.",
  "La fibra alimentare non solo aiuta la digestione ma può anche migliorare la salute del microbioma intestinale.",
  "Il cioccolato fondente (minimo 70% cacao) è ricco di flavonoidi, potenti antiossidanti.",
  "Mangiare lentamente favorisce la digestione e riduce il rischio di sovraccarico calorico.",
  "La caffeina, in dosi moderate, può migliorare l’attenzione e la performance cognitiva.",
];

export default function NutritionalTips() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="nutritional-tips">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          style={{ margin: 0 }}
        >
          {tips[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
