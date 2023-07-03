const db = require('../db')

class userToTagController {

    /**************************************************************
     * Создание новой связи между user_id (пользоватля) и tag_id (тега)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async addUserToTag(req,res) {
        const {user_id, tag_id} = req.body
        const newUTE = await db.query(`insert into "user_to_tag" (user_id, tag_id) values ($1, $2) returning * `, [user_id, tag_id])
        res.json(newUTE.rows[0])
    }

    /**************************************************************
     * Получение всех связей
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getAllUserToTag(req,res) {
        const allUserToTags = await db.query(`select * from "user_to_tag"`)
        res.json(allUserToTags.rows)
    }
    /**************************************************************
     * Получение связи по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getIdUserToTag(req,res) {
        const id = req.params.id
        const userToTag = await db.query(`select * from "user_to_tag" where id = $1`, [id])
        res.json(userToTag.rows)
    }
    /**************************************************************
     * Получение всех связей пользователя по user_id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getTagToIdUser(req,res) {
        const user_id = req.params.user_id
        const userToTag = await db.query(`select * from "user_to_tag" where user_id = $1`, [user_id])
        res.json(userToTag.rows)
    }
    /**************************************************************
     * Получение связи по user_id (пользователя) и tag_id (тега)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getIdUserToIdTag(req,res) {
        const {user_id, tag_id} = req.body
        const userToTag = await db.query(`select * from "user_to_tag" where user_id = $1 and tag_id = $2`, [user_id, tag_id])
        res.json(userToTag.rows[0])
    }

    /**************************************************************
     * Удаление связи по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async deleteIdUserToTag(req,res) {
        const id = req.params.id
        const userToTag = await db.query(`delete from "user_to_tag" where id = $1`, [id])
        res.json(userToTag.rows[0])
    }
}

module.exports = new userToTagController()