const express = require('express')
const app = require('app')

const logMiddleware = (req, res, next) => {
    console.log(`HOST ${req.headers.host} | URL ${req.url} | METHOD ${req.method}`)
  
    req.appName = "GoNode"
  
    return next()
}
  
// Usar o middleware em modo global
app.use(logMiddleware);
  
  
// Parâmetros na url -> /paramval
app.get("/nome/:name", (req, res) => {
    res.send(`Welcome ${req.params.name}`);
  });
  
// Retornando json
app.get('/json/:nome', (req, res) => {
  res.json({
    message: `Welcome ${req.params.nome}`
  })
})
  
// Interceptando rotas
app.get('/middleware', logMiddleware,  (req,res) => {
  res.json({
    msgmiddleware: `Bem-vindo ao -> ${req.appName}`
  })
})