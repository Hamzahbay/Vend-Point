const router = require('express').Router()
const Controller = require('../Controllers/product')
const controller = new Controller()

// Ensure authenticate (authentication check)
const authentication = require('../Config/authentication')

// page handling
router.get('/', authentication.ensure, controller.get.page)
router.get('/new', authentication.ensure, controller.get.addStock)
router.get('/warehouse/edit', authentication.ensure, controller.get.editWarehouse)

// post handling
router.post('/new', authentication.ensure, controller.post.addStock)
router.post('/warehouse/edit', authentication.ensure, controller.post.editWarehouse)

module.exports = router