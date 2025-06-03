const jwt = require("jsonwebtoken");

const verificaToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token mancante o malformato" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.utente = decoded; // esempio: { utenteId, ruolo, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token non valido o scaduto" });
  }
};

module.exports = verificaToken;
