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
    Categoria.find().lean().sort({ date: 'desc' }).then((categorias) => {
        res.render('admin/categorias', { categorias: categorias })
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao listar categorias')
    })


})
router.get('/categoria/add', (req, res) => {
    res.render('admin/addCategorias')
})
router.post('/new', (req, res) => {
    //res.send('nome: ' + req.body.nome + 'slug:' + req.body.slug)
    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ text: 'Nome invlálido' })
    }
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ text: 'Slug inválido' })
    }
    if (req.body.nome.length < 2) {
        erros.push({ texto: 'Nome da Categoria muito pequena' })
    }
    if (erros.length > 0) {
        res.render('admin/addCategorias', { erros: erros })
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(() => {
            //console.log('salve category')
            req.flash('success_msg', 'Categoria salva com sucesso')
            res.redirect('/admin/categorias')
        }).catch((err) => {
            //res.send('erro: ' + err)
            req.flash('error_msg', 'erro ao cadastrar, tente novamente!')
            res.redirect('/admin')
                //console.log('error in salve category: ' + err)
        })
    }



})

module.exports = router