const express = require("express");
const app = express();
const nunjucks = require('nunjucks');

// Configurando nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});

app.set('view engine', 'njk');


app.get("/", (req, res) => {
  res.render('list', { name: "Kevin" })
});


app.listen(3333);
