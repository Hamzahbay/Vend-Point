// Import required modules
const Electron = require('electron')
// Browser Windows
const browserWindow = require('./../Middlewares/browserWindows')

// Table Models
const Data = require('../Models/Tables/Data')
const User = require('../Models/Tables/User')
const Account = require('../Models/Tables/Account')
const Supplier = require('../Models/Tables/Supplier')
const Buyer = require('../Models/Tables/Buyer')
const Memo = require('../Models/Tables/Memo')
const Product = require('../Models/Tables/Product')
const Purchase = require('../Models/Tables/Purchase')
const Selling = require('../Models/Tables/Selling')
const PurchaseInvoice = require('../Models/Tables/PurchaseInvoice')
const SellingInvoice = require('../Models/Tables/SellingInvoice')
const Expenses = require('../Models/Tables/Expenses')
const Inclusion = require('../Models/Tables/Inclusion')
const ExpensesInvoice = require('../Models/Tables/ExpensesInvoice')
const InclusionInvoice = require('../Models/Tables/InclusionInvoice')
const Warehouse = require('../Models/Tables/Warehouse')
const Log = require('../Models/Tables/Log')

// Authentication
const authentication = require('../Config/authentication')

// date time library
const moment = require('moment')

class SellingPage {
    constructor() {
        this.get = {
            page: (req, res) => {
                res.render('selling/index')
            },
            invoice: (req, res) => {
                authentication.db.findOne().then(auth => {
                    Buyer(auth.data.path).findAll().then(buyer => {
                        Product(auth.data.path).findAll().then(product => {
                            Selling(auth.data.path).findAll().then(selling => {
                                Warehouse(auth.data.path).findAll().then(warehouse => {
                                    res.render('selling/invoice/index', { query: req.query, buyer, product, selling, warehouse })
                                })
                            })
                        })
                    })
                })
            },
            debt: (req, res) => {
                // res.render('selling/debt/index')
            },
            debtWindow: (req, res) => {
                res.render('selling/debt/index')
            },
            returns: (req, res) => {
                // res.render('selling/returns/index')
            },
            returnsWindow: (req, res) => {
                res.render('selling/returns/index')
            },
            list: (req, res) => {
                // res.render('selling/list/index')
            },
            listWindow: (req, res) => {
                res.render('selling/list/index')
            },
            buyer: (req, res) => {
                authentication.db.findOne().then(auth => {
                    Buyer(auth.data.path).findAll().then(buyer => {
                        Electron.app.whenReady().then(() => browserWindow.initialInventory(null, 'http://localhost:1400/selling/buyerWindow?invoice=off', true)).then(() => console.log('Warehouse form window showed!')).catch(err => console.log(err))
                    })
                })
            },
            buyerWindow: (req, res) => {
                authentication.db.findOne().then(auth => {
                    Buyer(auth.data.path).findAll().then(buyer => {
                        res.render('selling/buyer/index', { query: req.query, buyer })
                    })
                })
            },
            buyerNew: (req, res) => {
                authentication.db.findOne().then(auth => {
                    Buyer(auth.data.path).findAll().then(buyer => {
                        Electron.app.whenReady().then(() => browserWindow.warehouseAfter(null, 'http://localhost:1400/selling/buyerWindow/new?invoice=off', true)).then(() => console.log('Warehouse form window showed!')).catch(err => console.log(err))
                    })
                })
            },
            buyerWindowNew: (req, res) => {
                authentication.db.findOne().then(auth => {
                    Buyer(auth.data.path).findAll().then(buyer => {
                        res.render('selling/buyer/new/index', { query: req.query, buyer })
                    })
                })
            }
        }
        this.post = {
            buyerNew: (req, res) => {
                let body = req.body
                authentication.db.findOne().then(auth => {
                    Buyer(auth.data.path).findOne({ where: { name: body.name } }).then(buyer => {
                        if( buyer ) {
                            return res.redirect('/selling/buyerWindow/new?errorMessage=duplicated')
                        }
                        Buyer(auth.data.path).create({ name: body.name, type: body.type, note: body.note }).then(async buyer1 => {
                            await Log(auth.data.path).create({ targetId: buyer1.id, type: 'buyer', action: 'create' })
                            return res.redirect('/selling/buyerWindow/new?successMessage=' + body.name)
                        })
                    }).catch(err => console.log(err))
                })
            },
            buyerUpdate: (req, res) => {
                let body = req.body
                authentication.db.findOne().then(auth => {
                    Buyer(auth.data.path).findOne({ where: { name: body.name } }).then(buyer => {
                        if( buyer && buyer.id != req.params.id ) {
                            return res.redirect('/selling/buyerWindow?errorMessage=duplicated')
                        }
                        Buyer(auth.data.path).update({ name: body.name, type: body.type, note: body.note }, { where: { id: req.params.id } }).then(async buyer1 => {
                            await Log(auth.data.path).create({ targetId: req.params.id, type: 'buyer', action: 'update' })
                            return res.redirect('/selling/buyerWindow?successMessage=' + body.name)
                        })
                    }).catch(err => console.log(err))
                })
            }
        }
    }
}

module.exports = SellingPage