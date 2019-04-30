const express = require("express");
const app = express();

// Parâmetros GET/ Query params -> ?param=value
app.get("/", (req, res) => {
  res.send(`Bem-vindo ${req.query.name}`);
});

// Parâmetros na url -> /paramval
app.get("/nome/:name", (req, res) => {
  res.send(`Bem-vindo ${req.params.name}`);
});

app.listen(3333);
