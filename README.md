Aulas do módulo 1 NodeJs do Bootcamp da Rocketseat

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

#Middleware
    Intercepta nossas requisições e devolve ou não uma resposta

    Do modo abaixo nós interceptamos e interrompemos a requisição do usuário
    - Intercepta e bloqueia o fluxo do express
        const logMiddleware = (req, res) => {
            console.log(` HOST ${req.headers.host} | URL ${req.url} | METHOD ${req.method}`)
        }
    Do modo abaixo nós interceptamos mas não interrompemos a requisição do usuário
    - Intercepta e executa os próximos (next()) middlewares
        const logMiddleware = (req, res, next) => {
            console.log(`HOST ${req.headers.host} | URL ${req.url} METHOD ${req.method}`)
            return next()   <- Para não bloquearmos a requisição do usuário
        }

    _Podemos passar este middleware apenas na rota escolhida_
    
        app.get('/', logMiddleware, (req, res) => {
            return res.send('Returned')
        })

    _Podemos utilizar os middlewares para passar informações para a requisição e utilizarmos depois_
    - Deste modo todos os middlewares executados após este terão acesso à variável appName de req
        const logMiddleware = (req, res, next) => {
            console.log(`HOST ${req.headers.host} | URL ${req.url} | METHOD ${req.method}`);

            req.appName = "GoNode";

            return next();
        }

    _Podemos também usar este middleware em todas as rotas usando a função use()_
    
    app.use(logMiddleware)