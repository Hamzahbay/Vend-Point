const router = require('express').Router()
const Controller = require('../Controllers/product')
const controller = new Controller()

// Ensure authenticate (authentication check)
const authentication = require('../Config/authentication')

// page handling
router.get('/', authentication.ensure, controller.get.page)
router.get('/newStock', authentication.ensure, controller.get.newStock)
router.get('/addStock', authentication.ensure, controller.get.addStock)
router.get('/editStock', authentication.ensure, controller.get.editStock)
router.get('/updateStock', authentication.ensure, controller.get.updateStock)
router.get('/addWarehouse', authentication.ensure, controller.get.addWarehouse)
router.get('/warehouse/edit', authentication.ensure, controller.get.editWarehouse)
router.get('/warehouse/:id', authentication.ensure, controller.get.warehouse)
router.get('/warehouseDetail/:id', authentication.ensure, controller.get.warehouseDetail)
router.get('/warehouseDetail/update/:id', authentication.ensure, controller.get.warehouseUpdate)
router.get('/warehouseDetail/modify/:id', authentication.ensure, controller.get.warehouseModify)

// post handling
router.post('/newStock', authentication.ensure, controller.post.newStock)
router.post('/updateStock/:id', authentication.ensure, controller.post.updateStock)
router.post('/warehouse/edit/:newAccount', authentication.ensure, controller.post.editWarehouse)
router.post('/warehouseDetail/modify/:id', authentication.ensure, controller.post.modifyWarehouse)
router.post('/warehouseDetail/:id/:productId', authentication.ensure, controller.post.warehouse)

module.exports = router