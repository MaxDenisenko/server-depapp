const Routes = require('express').Router
const {login} = require('../controllers/login.controllers')

const router = new Routes()

router.post('/login',login)

module.exports = router