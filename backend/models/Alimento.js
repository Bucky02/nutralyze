const mongoose = require("mongoose");

// Definizione dello schema (puoi adattare i tipi in base al tuo dataset!)
const AlimentoSchema = new mongoose.Schema({
  ID: Number,
  Nome: String,
  Categoria: String,
  "Unità di riferimento": String,
  "Energia, kilojoules (kJ)": String,
  "Energia, calorie (kcal)": String,
  "Acidi grassi, saturi (g)": String,
  "Acidi grassi, monoinsaturi (g)": String,
  "Acidi grassi, polinsaturi (g)": String,
  "Colesterolo (mg)": String,
  "Zuccheri (g)": String,
  "Fibra alimentare (g)": String,
  "Proteine (g)": String,
  "Sale (NaCl) (g)": String,
  "Alcool (g)": String,
  "Acqua (g)": String,
  "Attività di vitamina A RE (µg-RE)": String,
  "Attività di vitamina A RAE (µg-RE)": String,
  "Vitamina B1 (tiamina) (mg)": String,
  "Vitamina B2 (riboflavina) (mg)": String,
  "Vitamina D (calciferolo) (µg)": String,
  "Potassio (K) (mg)": String,
  "Sodio (Na) (mg)": String,
  "Cloro (Cl) (mg)": String,
  "Calcio (Ca) (mg)": String,
  "Magnesio (Mg) (mg)": String,
  "Fosforo (P) (mg)": String,
  "Ferro (Fe) (mg)": String,
  "Iodio (I) (µg)": String,
  "Zinco (Zn)  (mg)": String,
});

// Esportazione del modello
module.exports = mongoose.model("Alimento", AlimentoSchema, "giochi");
