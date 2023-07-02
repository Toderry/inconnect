const db = require('../db')

class eventToTagController {

    async addEventToTag(req,res) {
        const {event_id, tag_id} = req.body
        const newETT = await db.query(`insert into "event_to_tag" (event_id, tag_id) values ($1, $2) returning * `, [event_id, tag_id])
        //INSERT INTO distributors (id, dname) VALUES (5, 'Gizmo Transglobal'), (6, 'Associated Computing, Inc') ON CONFLICT (id) DO NOTHING
        // console.log(id)
        res.json(newETT.rows[0])
    }

    async getAllEventToTag(req,res) {
        const allEventToTags = await db.query(`select * from "event_to_tag"`)
        res.json(allEventToTags.rows)
    }

    async getIdEventToTag(req,res) {
        const id = req.params.id
        const eventToTag = await db.query(`select * from "event_to_tag" where id = $1`, [id])
        res.json(eventToTag.rows)
    }
    async getIdEventToIdTag(req,res) {
        const {event_id, tag_id} = req.body
        const eventToTag = await db.query(`select * from "event_to_tag" where event_id = $1 and tag_id = $2`, [event_id, tag_id])
        res.json(eventToTag.rows)
    }
    async getPictureByEventId(req,res) {
        const event_id = req.params.id
        const eventToTag = await db.query(`select t.picture_url from "event_to_tag" as et 
    inner join tag as t on et.tag_id=t.id where et.event_id = $1;`, [event_id])
        res.json(eventToTag.rows[0])
    }
    async getTagIdByEventId(req,res) {
        const event_id = req.params.id
        const eventToTag = await db.query(`select tag_id from "event_to_tag" where event_id = $1;`, [event_id])
        res.json(eventToTag.rows[0])
    }

    async deleteIdEventToTag(req,res) {
        const id = req.params.id
        const eventToTag = await db.query(`delete from "event_to_tag" where id = $1`, [id])
        res.json(eventToTag.rows[0])
    }
}

module.exports = new eventToTagController()