const db = require('../db')

class userToEventController {

    async addUserToEvent(req, res) {
        const {user_id, event_id} = req.body
        const newUTE = await db.query(`insert into "user_to_event" (user_id, event_id)
                                       values ($1, $2)
                                       returning * `, [user_id, event_id])
        //INSERT INTO distributors (id, dname) VALUES (5, 'Gizmo Transglobal'), (6, 'Associated Computing, Inc') ON CONFLICT (id) DO NOTHING
        // console.log(id)
        res.json(newUTE.rows[0])
    }

    async getAllUserToEvent(req, res) {
        const allUserToEvents = await db.query(`select *
                                                from "user_to_event"`)
        res.json(allUserToEvents.rows)
    }

    async getIdUserToEvent(req, res) {
        const id = req.params.id
        const userToEvent = await db.query(`select *
                                            from "user_to_event"
                                            where id = $1`, [id])
        res.json(userToEvent.rows)
    }

    async getIdUserToIdEvent(req, res) {
        const {user_id, event_id} = req.body
        //const user_id = req.params.id
        //const event_id = req.params.id
        const userToEvent = await db.query(`select *
                                            from "user_to_event"
                                            where user_id = $1
                                              and event_id = $2`, [user_id, event_id])
        res.json(userToEvent.rows[0])
        console.log(JSON.stringify(userToEvent.rows))
    }

    async deleteIdUserToEvent(req, res) {
        const id = req.params.id
        const userToEvent = await db.query(`delete
                                            from "user_to_event"
                                            where id = $1`, [id])
        res.json(userToEvent.rows[0])
    }
}

module.exports = new userToEventController()