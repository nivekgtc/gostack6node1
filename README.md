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

#Nunjucks
    _Template engine para renderizar html com conteúdo em JavaScript_

    const nunjucks = require('nunjucks')

    -> Configurando
    @param views É o nome da pasta onde está localizado nossas views
    @param Um objeto
    nunjucks('views', {
        autoescape: true, // Para manipular o nome dos arquivos
        express: app, // referencia a variável do express
        watch: true, // para não precisarmos reiniciar o servidor ao realizar configurações nos arquivos
    })

    // O método set() serve para settarmos configurações globais
    @ O parâmetro view engine diz qual é a extensão que vamos usar nos nossos arquivos nunjucks
    @ O segundo parametro é a extensão
    app.set('view engine', 'njk);

    Inside njk
    Podemos utilizar HTML comum dentro dos nossos arquivos .njk
    <h1>{{variavelRecebida}}</h1>

    Como renderizar nossas views njk?
    - utilizamos o res.render( <arquivo para renderizar>, { nossasVariaveis })
        app.get('/', (req, res) => {
            res.render('list', { name: Kevin })
        })

    Podemos passar variáveis para serem renderizadas utilizando o nunjucks

    const users = ["Kevin", "Kevinn", "Kevinnn"];

    app.get('/', (req, res) => {
        res.render('list', {users})
    })

    list.njk
    <h1>Listagem de usuários</h1>
    <ul>
        {% for user in users %} -> Operações de repetições ou condicional
        <li>{{user}}</li>       -> Passando cada user para um <li>
        {% endfor %}            -> Finalizando o for
    </ul>

    -> passar próximas telas
    <a href="/new">Cadastrar usuário</a> -> Passa para a página new

    new.njk
    <h1>Novo usuário</h1>

    index.js

    app.get('/new', (req, res) => {
        res.render('new')
    })

#Enviando formulários
    new.njk
    - method -> método http
    - action -> rota que o formulário irá chamar
        <form action="/create" method="POST">
            <input name="user">
            <button type="submit">Salvar</button>
        </form>
        <a href="/">Listagem de usuários</a>



    index.js
        - Informamos ao nosso express saber lidar com info de forms html
        app.use(express.urlencoded({extended: false}))
        - obter informações no corpo da requisição
        app.post('/create', (req,res) => {
            console.log(req.body);
            users.push(req.body.user); -> Adicionamos o novo usuário ao array de users
            return res.redirect("/"); --> Redireciona o usuário para a trota passada como parâmetro
        })