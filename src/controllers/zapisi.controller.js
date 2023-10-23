const db = require('../services/db.Config')

class ZapisiControllers {
    async getZapisi (req, res) {
        const zapisi = await db.query('SELECT * FROM zapisi')
        res.json(zapisi.rows)
    }
    async createZapis (req, res) {
        const { id, date, zone, sum, client, clientphone, comment } = req.body
        const newZapis = await db.query (`INSERT INTO zapisi (date, zone, sum, client, clientphone,comment) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [date, zone, sum, client, clientphone, comment])
        res.json(newZapis.rows[0])
    }
    async deleteZapis (req, res) {
        const {id} = req.params.id
        const deleteZapis = await db.query (`DELETE FROM zapisi where id = $1`,[id])
        res.json(deleteZapis.rows[0])
    }
}

module.exports = new ZapisiControllers()