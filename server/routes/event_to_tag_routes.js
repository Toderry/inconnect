const Router = require('express')
const router = new Router()
const eventTagController = require('../controller/event_to_tag_controller')

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/eventTag', eventTagController.addEventToTag)

/**************************************************************
 * Запросы на получение
 **************************************************************/
router.get('/eventTag', eventTagController.getAllEventToTag)
router.get('/eventTag/:id', eventTagController.getIdEventToTag)
router.get('/eventTag/IdId', eventTagController.getIdEventToIdTag)
router.get('/eventTag/picture/:id', eventTagController.getPictureByEventId)
router.get('/eventTag/tagId/:id', eventTagController.getTagIdByEventId)
router.get('/eventTag/eventByTag/:id', eventTagController.getEventByTagId)

/**************************************************************
 * Запросы на удаление
 **************************************************************/
router.delete('/eventTag/:id', eventTagController.deleteIdEventToTag)


module.exports = router