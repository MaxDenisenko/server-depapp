const Router = require('express')

const router = new Router()
const {test, getZapisi, createZapis, deleteZapis} = require('../controllers/zapisi.controller')

router.get('/zapisi', getZapisi)
router.post('/zapisi', createZapis)
router.delete('/zapisi/:id', deleteZapis)
router.get('/test',test)

module.exports = router