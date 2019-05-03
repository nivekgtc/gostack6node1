Documentação simplificada dos passos do projeto

#_Utilizando Express_
## O express é um middleware que lida com rotas

    const express = require('express')
    const app = express();

    app.get('/', (req, res) => {
        return res.send('Hello World')
    })
    _ O método get() intercepta e cria rotas 

    :/param _Serve para passarmos parâmetros via url_
    app.get('/login/:name', (req, res) => {
        return res.send(`Bem-vindo ${req.params.name}`)
        -> Dentro deste parâmetros passamos o nome que  escolhemos na rota
    })


    ####Paramêtros via url

    /:<nomeDoParametro>
    
    ####Query Params - Usado para redirecionamento ou quando temos muitas urls
    // Forma de obtenção no navegador -> ?name=Kevin
    app.get('/inicial' (req, res) => {
        return res.send(`Bem-vindo ${req.query.name}`) -> Aqui obtemos o nome do parâmetro get
    })

    #### Retornando JSON
    app.get('/nome/:name', (req,res) => {
        return res.json({
            message: `${req.params.name}`
        })
    })

    app.listen(3333); -> Para iniciarmos o servidor na porta passada como parâmetro