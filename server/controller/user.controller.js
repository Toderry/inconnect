const db = require('../db')

class UserController {

    async addId(req,res) {
        const {id} = req.body
        const newUser = await db.query(`insert into "user" (id) values ($1) returning *`, [id])
        // console.log(id)
        res.json(newUser.rows[0])
    }

    async getAllId(req,res) {
        const allUsers = await db.query(`select * from "user"`)
        res.json(allUsers.rows)
    }

    async getId(req,res) {
        const id = req.params.id
        const user = await db.query(`select * from "user" where id = $1`, [id])
        res.json(user.rows[0])
    }

    async updateId(req,res) {
        const oldId = req.params.id
        const {id} = req.body
        const user = await db.query(`update "user" set id = $1 where id = $2 returning *`, [id, oldId])
        res.json(user.rows[0])
    }

    async deleteId(req,res) {
        const id = req.params.id
        const user = await db.query(`delete from "user" where id = $1`, [id])
        res.json(user.rows[0])
    }

}

module.exports = new UserController()