const zapisiModels = require('../models/zapisi.module')

class ZapisiService {
    async getZapis() {
        const zapisiData = await zapisiModels.findAll()
        return zapisiData
    }
    async createZapis(date, area, sum, fioClient, phoneClient, comment) {
        const createZapis = zapisiModels.create({date, area, sum, fioClient, phoneClient, comment})
        return createZapis
    }
    
}

module.exports = new ZapisiService()