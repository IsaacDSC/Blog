const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('pagina de adm')
})

router.get('/post', (req, res) => {
    res.send('pagina de Posts')
})
router.get('/categorias', (req, res) => {
    res.send('Pagina de categorias')
})
module.exports = router