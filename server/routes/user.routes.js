const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

router.post('/user', userController.addId)
router.get('/user', userController.getAllId)
router.get('/user/:id', userController.getId)
router.put('/user/:id', userController.updateId)
router.delete('/user/:id', userController.deleteId)

module.exports = router