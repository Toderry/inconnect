const Router = require('express')
const router = new Router()
const userEventController = require('../controller/user_to_event_controller')

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/userEvent', userEventController.addUserToEvent)

/**************************************************************
 * Запросы на получение
 **************************************************************/
router.get('/userEvent', userEventController.getAllUserToEvent)
router.get('/userEvent/id/:id', userEventController.getIdUserToEvent)
router.get('/userEvent/userId/:user_id', userEventController.getEventToIdUser)
router.post('/userEvent/IdId', userEventController.getIdUserToIdEvent)
router.get('/userEvent/eventByUser/:user_id', userEventController.getEventsByUserId)

/**************************************************************
 * Запросы на удаление
 **************************************************************/
router.delete('/userEvent/:id', userEventController.deleteIdUserToEvent)


module.exports = router