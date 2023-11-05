const RegistrationService = require('../services/registration.service')

class RegistrationControllers {
    async registration(req, res, next) {
        try {
            const {name, lastname, email, password} = req.body
            const userData = await RegistrationService.registration(name, lastname, email, password)
            return res.json(userData)
            
        } catch (error) {
            next(error)
        }
    }
    async activate(req, res, next) {
        try {
            const activatedLink = req.params.link
            await RegistrationService.activate(activatedLink)
            return res.json('Аккаунт активирован')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new RegistrationControllers()