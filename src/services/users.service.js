const usersModels = require('../models/users.models')

class UsersService {
    async getUser() {
        try {
            const user = await usersModels.findOne()
            return user
        } catch (error) {
                console.log(error)
        }
    }
}

module.exports = new UsersService()