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
                res.render('setting/inventory/initial/index', { query: req.query })
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
                        await Account(auth.data.path).create({ name: m, detail: { nominal: result[m] } })
                    }).catch(err => console.log(err))
                }


                Electron.BrowserWindow.getFocusedWindow().closable = true
                Electron.BrowserWindow.getFocusedWindow().close()
            }
        }
    }
}

module.exports = Setting