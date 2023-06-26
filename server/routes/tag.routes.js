const Router = require('express')
const router = new Router()
const tagController = require('../controller/tag.controller')


router.post('/tag', tagController.addTag)


router.get('/tag', tagController.getAllTag)
router.get('/tag/:id', tagController.getIdTag)


router.put('/tag/:id', tagController.updateIdTag)
router.delete('/tag/:id', tagController.deleteIdTag)


module.exports = router