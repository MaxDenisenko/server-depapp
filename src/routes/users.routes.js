const Routes = require('express').Router
const {getUser} = require('../controllers/users.controllers')

const router = new Routes()

router.get('/user',getUser)

module.exports = router