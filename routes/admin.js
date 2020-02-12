const express = require('express')
const router = express.Router()


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

module.exports = router