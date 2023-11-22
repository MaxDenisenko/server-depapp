const zapisiService = require('../services/zapisi.service')

class ZapisiControllers {
    async getZapisi (req, res) {
        const zapisi = await zapisiService.getZapis()
        return res.json(zapisi)
    }
    async createZapis (req, res) {
        const { date, area, sum, fioClient, phoneClient, comment } = req.body
        const zapisData = await zapisiService.createZapis(date, area, sum, fioClient, phoneClient, comment)
        return res.json(zapisData)
    }
    async deleteZapis (req, res) {
        const {id} = req.params.id
        const deleteZapis = await db.query (`DELETE FROM zapisi where id = $1`,[id])
        res.json(deleteZapis.rows[0])
    }
    async test (req,res) {
        res.json('test')
    }
}

module.exports = new ZapisiControllers()