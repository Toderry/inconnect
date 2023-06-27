const Router = require('express')
const router = new Router()
const eventTagController = require('../controller/event_to_tag_controller')


router.post('/eventTag', eventTagController.addEventToTag)


router.get('/eventTag', eventTagController.getAllEventToTag)
router.get('/eventTag/:id', eventTagController.getIdEventToTag)
router.get('/eventTag/IdId', eventTagController.getIdEventToIdTag)


router.delete('/eventTag/:id', eventTagController.deleteIdEventToTag)


module.exports = router