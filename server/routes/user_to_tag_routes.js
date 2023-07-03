const Router = require('express')
const router = new Router()
const userTagController = require('../controller/user_to_tag_controller')

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/userTag', userTagController.addUserToTag)

/**************************************************************
 * Запросы на получение
 **************************************************************/
router.get('/userTag', userTagController.getAllUserToTag)
router.get('/userTag/id/:id', userTagController.getIdUserToTag)
router.get('/userTag/userId/:user_id', userTagController.getTagToIdUser)
router.post('/userTag/IdId', userTagController.getIdUserToIdTag)

/**************************************************************
 * Запросы на удаление
 **************************************************************/
router.delete('/userTag/:id', userTagController.deleteIdUserToTag)


module.exports = router