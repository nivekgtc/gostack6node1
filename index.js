const express = require("express");
const app = express();

// Parâmetros GET/ Query params -> ?param=value
app.get("/", (req, res) => {
  res.send(`Bem-vindo ${req.query.name}`);
});

// Parâmetros na url -> /paramval
app.get("/nome/:name", (req, res) => {
  res.send(`Welcome ${req.params.name}`);
});

// Retornando json
app.get('/:nome', (req, res) => {
  res.json({
    message: `Welcome ${req.params.nome}`
  })
})

app.listen(3333);
