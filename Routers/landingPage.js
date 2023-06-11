const router = require('express').Router()
const Controller = require('../Controllers/landingPage')
const controller = new Controller()

// page handling
router.get('/', controller.get.page)
router.get('/loading', controller.get.loading)
router.get('/register', controller.get.register)
router.get('/open-data', controller.get.openData)
router.get('/logout', controller.get.logout)
router.get('/register/open-dialog', controller.get.registerOpenDialog)
router.get('/open-data/open-dialog', controller.get.openDataOpenDialog)
router.get('/open-data/login/:id', controller.get.login)

// post handling
router.post('/open-data/login/:id', controller.post.login)
router.post('/register/new-data/:dataName/:passwordChecker', controller.post.register)

module.exports = router