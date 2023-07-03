const db = require('../db')

class eventToTagController {

    /**************************************************************
     * Создание новой связи между event_id (событием} и tag_id (тегом)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async addEventToTag(req, res) {
        const {event_id, tag_id} = req.body
        const newETT = await db.query(`insert into "event_to_tag" (event_id, tag_id)
                                       values ($1, $2)
                                       returning * `, [event_id, tag_id])
        //INSERT INTO distributors (id, dname) VALUES (5, 'Gizmo Transglobal'), (6, 'Associated Computing, Inc') ON CONFLICT (id) DO NOTHING
        // console.log(id)
        res.json(newETT.rows[0])
    }


    /**************************************************************
     * Получение всех связей
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getAllEventToTag(req, res) {
        const allEventToTags = await db.query(`select *
                                               from "event_to_tag"`)
        res.json(allEventToTags.rows)
    }

    /**************************************************************
     * Получение связи по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getIdEventToTag(req, res) {
        const id = req.params.id
        const eventToTag = await db.query(`select *
                                           from "event_to_tag"
                                           where id = $1`, [id])
        res.json(eventToTag.rows)
    }

    /**************************************************************
     * Получение связи по event_id (события) и tag_id (тега)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getIdEventToIdTag(req, res) {
        const {event_id, tag_id} = req.body
        const eventToTag = await db.query(`select *
                                           from "event_to_tag"
                                           where event_id = $1
                                             and tag_id = $2`, [event_id, tag_id])
        res.json(eventToTag.rows)
    }

    /**************************************************************
     * Получение поля URL картинки по event_id (событию)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getPictureByEventId(req, res) {
        const event_id = req.params.id
        const eventToTag = await db.query(`select t.picture_url
                                           from "event_to_tag" as et
                                                    inner join tag as t on et.tag_id = t.id
                                           where et.event_id = $1;`, [event_id])
        res.json(eventToTag.rows[0])
    }

    /**************************************************************
     * Получение teg_id (тега) по event_id (события)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getTagIdByEventId(req, res) {
        const event_id = req.params.id
        const eventToTag = await db.query(`select tag_id
                                           from "event_to_tag"
                                           where event_id = $1;`, [event_id])
        res.json(eventToTag.rows[0])
    }

    /**************************************************************
     * Получение все события по teg_id (тега)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getEventByTagId(req, res) {
        const tag_id = req.params.id
        const event = await db.query(`select e.* from event as e 
    inner join event_to_tag as et on et.event_id = e.id 
    where et.tag_id = $1;`, [tag_id])
        res.json(event.rows)
    }


    /**************************************************************
     * Удаление связи по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async deleteIdEventToTag(req, res) {
        const id = req.params.id
        const eventToTag = await db.query(`delete
                                           from "event_to_tag"
                                           where id = $1`, [id])
        res.json(eventToTag.rows[0])
    }
}

module.exports = new eventToTagController()