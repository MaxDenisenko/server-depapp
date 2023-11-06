const ApiError = require('../exceptions/apiError')
const usersModel = require('../models/users.models')
const bcrypt = require('bcrypt')
const UserDto = require('../dto/user.dto')
const TokenService = require('../services/tokens.service')

class LoginService {
    async login(email, password){
        const findUser = await usersModel.findOne({where: {email}})
        if (!findUser) {
            throw ApiError.BadRequest(`Пользователь c ${email} не зарегистрирован`)
        }

        const isPasswordComapre = await bcrypt.compare(password, findUser.password)
        if (!isPasswordComapre){
            throw ApiError.BadRequest('Не верный пароль')
        }
        const userDto = new UserDto(findUser)
        const tokens = TokenService.generateToken({...userDto})
        await TokenService.saveToken(findUser.id, tokens.refreshToken)

        return {user: userDto, ...tokens}
    }
}

module.exports = new LoginService()