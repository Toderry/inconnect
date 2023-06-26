const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')


router.post('/user', userController.addUser)

router.get('/user', userController.getAllUser)
router.get('/user/:id', userController.getIdUser)


router.put('/user/:id', userController.updateIdUser)
router.delete('/user/:id', userController.deleteIdUser)

module.exports = router