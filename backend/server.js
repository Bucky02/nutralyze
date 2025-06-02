const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Middleware CORS corretto
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// ✅ Rotte
const alimentiRoutes = require("./routes/alimenti");
app.use("/api/alimenti", alimentiRoutes);
const utentiRouter = require("./routes/utenti");
app.use("/api/utenti", utentiRouter);
const pastiRouter = require("./routes/pasti");
app.use("/api/pasti", pastiRouter);

// ✅ Connessione MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connesso"))
  .catch((err) => console.error("❌ Errore MongoDB:", err));

// ✅ Avvio server
app.listen(PORT, () => {
  console.log(`🚀 Server attivo su http://localhost:${PORT}`);
});
