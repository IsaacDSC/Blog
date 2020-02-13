//Carregando modules
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

//adionando Rotas
const admin = require('./routes/admin')

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

//criando midleware
app.use((req, res, next) => {
    console.log('MIDDLEWARE ATIVATE!')
    next();
})

//Rotas
app.use('/admin', admin)

const PORT = 3000
app.listen(PORT, () => {
    console.log('SERVIDOR INICIADO!')
    console.log(`http://localhost:${PORT}`)
    console.log('BREAK SERVER CRTL + C')
})