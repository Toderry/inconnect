const db = require('../db')

class tagController {

    async addTag(req, res) {
        const {name, picture_url} = req.body
        const newTag = await db.query(`insert into "tag" (name, picture_url) values ($1, $2) returning * `, [name, picture_url])
        //INSERT INTO distributors (id, dname) VALUES (5, 'Gizmo Transglobal'), (6, 'Associated Computing, Inc') ON CONFLICT (id) DO NOTHING
        // console.log(id)
        res.json(newTag.rows[0])
    }

    async getAllTag(req, res) {
        const allTags = await db.query(`select * from "tag"`)
        res.json(allTags.rows)
    }

    async getIdTag(req, res) {
        const id = req.params.id
        const tag = await db.query(`select * from "tag" where id = $1`, [id])
        res.json(tag.rows)
    }

    async updateIdTag(req, res) {
        const id = req.params.id
        const {name, picture_url} = req.body
        const tag = await db.query(`update "tag" set name = $1 , picture_url = $2 where id = $3 returning *`, [name, picture_url, id])
        res.json(tag.rows[0])
    }

    async deleteIdTag(req, res) {
        const id = req.params.id
        const tag = await db.query(`delete from "tag" where id = $1`, [id])
        res.json(tag.rows[0])
    }
}

module.exports = new tagController()