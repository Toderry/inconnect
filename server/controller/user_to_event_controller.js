const db = require('../db')

class userToEventController {

    /**************************************************************
     * Создание новой связи между user_id (пользоватлем) и (event_id) событием
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async addUserToEvent(req,res) {
        const {user_id, event_id} = req.body
        const newUTE = await db.query(`insert into "user_to_event" (user_id, event_id) values ($1, $2) returning * `, [user_id, event_id])
        //INSERT INTO distributors (id, dname) VALUES (5, 'Gizmo Transglobal'), (6, 'Associated Computing, Inc') ON CONFLICT (id) DO NOTHING
        // console.log(id)
        res.json(newUTE.rows[0])
    }

    /**************************************************************
     * Получение всех связей
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getAllUserToEvent(req,res) {
        const allUserToEvents = await db.query(`select * from "user_to_event"`)
        res.json(allUserToEvents.rows)
    }
    /**************************************************************
     * Получение связи по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getIdUserToEvent(req,res) {
        const id = req.params.id
        const userToEvent = await db.query(`select * from "user_to_event" where id = $1`, [id])
        res.json(userToEvent.rows)
    }
    /**************************************************************
     * Получение всех связей пользователя по user_id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getEventToIdUser(req,res) {
        const user_id = req.params.user_id
        const userToEvent = await db.query(`select * from "user_to_event" where user_id = $1`, [user_id])
        res.json(userToEvent.rows)
    }
    /**************************************************************
     * Получение связи по user_id пользователя и event_id события
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getIdUserToIdEvent(req,res) {
        const {user_id, event_id} = req.body
        //const user_id = req.params.id
        //const event_id = req.params.id
        const userToEvent = await db.query(`select * from "user_to_event" where user_id = $1 and event_id = $2`, [user_id, event_id])
        res.json(userToEvent.rows[0])
        //console.log(JSON.stringify(userToEvent.rows))
    }

    /**************************************************************
     * Удаление связи по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async deleteIdUserToEvent(req,res) {
        const id = req.params.id
        const userToEvent = await db.query(`delete from "user_to_event" where id = $1`, [id])
        res.json(userToEvent.rows[0])
    }
}

module.exports = new userToEventController()