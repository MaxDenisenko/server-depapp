const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token.models')
const ApiError = require('../exceptions/apiError')
const usersModel = require('../models/users.models')
const UserDto = require('../dto/user.dto')


class TokenService {
     generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN,{expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESS_TOKEN,{expiresIn: '30d'})
        return { accessToken, refreshToken }
    }

    async saveToken(userId, refreshToken) {
        const findToken = await tokenModel.findOne({where: {userId}})
        if (findToken) {
            await tokenModel.update({refreshToken}, {where: {userId}})
        }

        const token = await tokenModel.create({userId, refreshToken})

        return token
    }

    async removeToken(refreshToken){
        const tokenData = await tokenModel.destroy({where: {refreshToken}})
        return tokenData
    }

    validateAccessToken (token) {
        try {
            const tokenData = jwt.verify(token,process.env.JWT_ACCESS_TOKEN)
            return tokenData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken (token) {
        try {
            const tokenData = jwt.verify(token,process.env.JWT_REFRESS_TOKEN)
            return tokenData
        } catch (e) {
            return null
        }
    }

    async findToken(token) {
        const tokenData = await tokenModel.findOne({where: {token}})
        return tokenData
    }

    async refreshToken(refreshToken) {
        if (!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = this.validateRefreshToken(refreshToken)
        const findToken = this.findToken(refreshToken)
        if (!userData || !findToken) {
            throw ApiError.UnauthorizedError()
        }

        const findUser = await usersModel.findOne({where: {id: userData.userId}})
        const userDto = new UserDto(findUser)
        const tokens = TokenService.generateToken({...userDto})
        
        await saveToken(findUser.id, tokens.refreshToken)
        return {user: userDto, ...tokens}
    }
}

module.exports = new TokenService()