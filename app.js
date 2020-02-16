//Carregando modules
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

//adionando Rotas
const admin = require('./routes/admin')

//configuração da sessao
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}))

//config flash
app.use(flash())

//criando midleware
app.use((req, res, next) => {
        // console.log('MIDDLEWARE ATIVATE!')
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        next()
    })
    //configurando body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//consigurando handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//adicionando pasta public
app.use(express.static(path.join(__dirname, 'public')))

//configurando mongose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/blogapp', {
    useunifiedTopology: true
}).then(() => {
    console.log('conectado com sucesso ao mongoDB')
}).catch((erro) => {
    console.log('erro ao se conectar ao Mongo: ' + erro)
})

//Rotas
app.use('/admin', admin)

const PORT = 3000
app.listen(PORT, () => {
    console.log('SERVIDOR INICIADO!')
    console.log(`http://localhost:${PORT}`)
    console.log('BREAK SERVER CRTL + C')
})