const loginService = require('../services/login.service')


class LoginControllers {
    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await loginService.login(email, password)
            res.cookie('refreshToken',userData.refreshToken,{maxAge: 30*24*60*60*1000, httpOnly: true, secure: true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LoginControllers()