//Carregando modules
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
    //const mongoose = require('mogoose')

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

//Rotas
app.use('/admin', admin)

const PORT = 3000
app.listen(PORT, () => {
    console.log('SERVIDOR INICIADO!')
    console.log(`http://localhost:${PORT}`)
    console.log('BREAK SERVER CRTL + C')
})