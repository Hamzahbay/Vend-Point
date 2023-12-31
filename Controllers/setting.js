// Import required modules
const Electron = require('electron')

// Browser Windows
const browserWindow = require('./../Middlewares/browserWindows')

// Models
// const Table = require('../Models/sql/Table')
const Folder = require('../Models/folder')
const File = require('../Models/file')
// Table Modles
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

class Setting {
    constructor() {
        this.get = {
            page: (req, res) => {
                res.render('setting/index')
            },
            account: (req, res) => {
                res.render('setting/account/index')
            },
            accountForm: (req, res) => {
                res.render('setting/account/new/index', { query: req.query })
            },
            initialInventory: (req, res) => {
                authentication.db.findOne().then(auth => {
                    Warehouse(auth.data.path).findAll().then(warehouse => {
                        res.render('setting/inventory/initial/index', { query: req.query, warehouse })
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }
        }
        this.post = {
            accountForm: (req, res) => {
                let body = req.body
                const result = {}
                if( Array.isArray(body.type) === false && Array.isArray(body.nominal) === false ) {
                    body.type = [body.type]
                    body.nominal = [body.nominal]
                }

                body.type.forEach((value, index) => {
                    const cleanNominal = body.nominal[index].replace(/,/g, '')
                    const parsedNominal = parseInt(cleanNominal)
                  
                    if (result.hasOwnProperty(value)) {
                      result[value] += parsedNominal
                    } else {
                      result[value] = parsedNominal
                    }
                })
                
                for( const m in result ) {
                    authentication.db.findOne().then(async auth => {
                        await Account(auth.data.path).create({ name: m, detail: { nominal: result[m] } }).then(async acc => {
                            await Log(auth.data.path).create({ targetId: acc.id, action: 'create', type: 'account' })
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }


                Electron.BrowserWindow.getFocusedWindow().closable = true
                Electron.BrowserWindow.getFocusedWindow().close()
            },
            initialInventory: async (req, res) => {
                let body = req.body
                let result = []
                if( Array.isArray(body.name) === false ) {
                    body.name = [body.name]
                    body.warehouse = [body.warehouse]
                    body.qty = [body.qty]
                    body.unit = [body.unit]
                    body.price = [body.price]
                }
                
                await body.name.forEach((name, index) => {
                    let existingIndex = result.findIndex(item => item.name === name && item.warehouseId === body.warehouse[index])
                    let qty = parseInt(body.qty[index].replace(/,/g, ''))
                    let price = parseInt(body.price[index].replace(/,/g, ''))
                    
                    if (existingIndex !== -1) {
                      result[existingIndex].qty += qty
                    //   return res.redirect('/setting/inventory/initial?errorMessage=')
                    } else {
                      result.push({
                        warehouseId: body.warehouse[index],
                        name: name,
                        unit: body.unit[index],
                        detail: [{ price, qty, from: 'initial-inventory', date: moment().format() }]
                      })
                    }
                })
                
                authentication.db.findOne().then(async auth => {
                    await Product(auth.data.path).bulkCreate(result).then(async products => {
                        products.forEach(async product => {
                            await Log(auth.data.path).create({ targetId: product.id, action: 'create', type: 'initial-product' })
                        })
                        
                        Electron.BrowserWindow.getFocusedWindow().closable = true
                        Electron.BrowserWindow.getFocusedWindow().close()
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }
        }
    }
}

module.exports = Setting