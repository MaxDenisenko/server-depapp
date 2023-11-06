const Routes = require('express').Router
const {login, refresh, getUser} = require('../controllers/login.controllers')

const router = new Routes()

router.post('/login',login)
router.get('/refresh', refresh)
router.get('/user', getUser)

module.exports = router