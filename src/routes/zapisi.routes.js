const Router = require('express')

const router = new Router()
const {test, getZapisi, createZapis, deleteZapis} = require('../controllers/zapisi.controller')

router.get('/zapis', getZapisi)
router.post('/zapis', createZapis)
router.delete('/zapis/:id', deleteZapis)
router.get('/test',test)

module.exports = router