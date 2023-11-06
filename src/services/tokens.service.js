const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token.models')

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
}

module.exports = new TokenService()