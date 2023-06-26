const Router = require('express')
const router = new Router()
const eventController = require('../controller/event.controller')

router.post('/event', eventController.addEvent)

router.get('/event', eventController.getAllEvents)
router.get('/event/id/:id', eventController.getById)
router.get('/event/name/:name', eventController.getByName)

router.put('/event/id/:id', eventController.updateById)
router.delete('/event/id/:id', eventController.deleteById)

module.exports = router