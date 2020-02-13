const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/post', (req, res) => {
    res.send('pagina de Posts')
})
router.get('/categorias', (req, res) => {
    res.render('admin/categorias')
})
router.get('/categoria/add', (req, res) => {
    res.render('admin/addCategorias')
})
router.post('/new', (req, res) => {
    //res.send('nome: ' + req.body.nome + 'slug:' + req.body.slug)
    var novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(() => {
        console.log('salve category')
    }).catch((err) => {
        console.log('error in salve category: ' + err)
    })
})

module.exports = router