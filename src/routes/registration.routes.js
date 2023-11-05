const Routes = require('express').Router
const router = new Routes()
const {registration,activate} = require('../controllers/registration.controllers')

router.post('/registration', registration)
router.get('/activate/:link', activate)

module.exports = router