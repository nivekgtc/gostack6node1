const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/nome/:name", (req, res) => {
  res.send(`Bem-vindo ${req.params.name}`);
});

// Parâmetros na url

// Parâmetros na

app.listen(3333);
