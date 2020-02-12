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
        useNewUrlParser: true
    }).then(() => {
        console.log('connect in MongoDB')
    }).catch((err) => {
        console.log('Problem in connect mongodb : ' + err)
    })
    //Rotas
app.use('/admin', admin)

const PORT = 3000
app.listen(PORT, () => {
    console.log('SERVIDOR INICIADO!')
    console.log(`http://localhost:${PORT}`)
    console.log('BREAK SERVER CRTL + C')
})