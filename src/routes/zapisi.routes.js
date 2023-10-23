const Router = require('express')

const router = new Router()
const {getZapisi, createZapis, deleteZapis} = require('../controllers/zapisi.controller')

router.get('/zapisi', getZapisi)
router.post('/zapisi', createZapis)
router.delete('/zapisi/:id', deleteZapis)

module.exports = router