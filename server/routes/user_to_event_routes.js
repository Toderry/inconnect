const Router = require('express')
const router = new Router()
const userEventController = require('../controller/user_to_event_controller')


router.post('/userEvent', userEventController.addUserToEvent)


router.get('/userEvent', userEventController.getAllUserToEvent)
router.get('/userEvent/id/:id', userEventController.getIdUserToEvent)
router.post('/userEvent/IdId', userEventController.getIdUserToIdEvent)


router.delete('/userEvent/:id', userEventController.deleteIdUserToEvent)


module.exports = router