const express = require("express");
const app = express();
const nunjucks = require('nunjucks');

// Configurando nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'njk');

const users = ["Kevin", "Kevinn", "Kevinnn"];

app.get("/", (req, res) => {
  res.render('list', { users })
});

app.get("/new", (req, res) => {
  res.render('new')
});

app.post('/create', (req, res) => {
  users.push(req.body.user)
  res.redirect('/')
})


app.listen(3333);
