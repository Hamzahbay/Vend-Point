const router = require('express').Router()
const Controller = require('../Controllers/selling')
const controller = new Controller()

// Ensure authenticate (authentication check)
const authentication = require('../Config/authentication')

// page handling
router.get('/', authentication.ensure, controller.page)

module.exports = router