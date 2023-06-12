const router = require('express').Router()
const Controller = require('../Controllers/setting')
const controller = new Controller()

// Ensure authenticate (authentication check)
const authentication = require('../Config/authentication')

// page handling
router.get('/', authentication.ensure, controller.get.page)
router.get('/account', authentication.ensure, controller.get.account)
router.get('/account/new', authentication.ensure, controller.get.accountForm)
router.get('/inventory/initial', authentication.ensure, controller.get.initialInventory)

// post handling
router.post('/account/new', authentication.ensure, controller.post.accountForm)
router.post('/inventory/initial', authentication.ensure, controller.post.initialInventory)

module.exports = router