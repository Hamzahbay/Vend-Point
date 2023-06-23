const router = require('express').Router()
const Controller = require('../Controllers/selling')
const controller = new Controller()

// Ensure authenticate (authentication check)
const authentication = require('../Config/authentication')

// page handling
router.get('/', authentication.ensure, controller.get.page)
router.get('/invoice', authentication.ensure, controller.get.invoice)
router.get('/returns', authentication.ensure, controller.get.returns)
router.get('/returnsWindow', authentication.ensure, controller.get.returnsWindow)
router.get('/debt', authentication.ensure, controller.get.debt)
router.get('/debtWindow', authentication.ensure, controller.get.debtWindow)
router.get('/list', authentication.ensure, controller.get.list)
router.get('/listWindow', authentication.ensure, controller.get.listWindow)
router.get('/buyer', authentication.ensure, controller.get.buyer)
router.get('/buyerWindow', authentication.ensure, controller.get.buyerWindow)
router.get('/buyer/new', authentication.ensure, controller.get.buyerNew)
router.get('/buyerWindow/new', authentication.ensure, controller.get.buyerWindowNew)

// post handling
router.post('/buyer/new', authentication.ensure, controller.post.buyerNew)
router.post('/buyer/update/:id', authentication.ensure, controller.post.buyerUpdate)

module.exports = router