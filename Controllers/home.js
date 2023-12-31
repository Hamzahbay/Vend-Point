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

// Authentication
const authentication = require('../Config/authentication')

// date time library
const moment = require('moment')

class Home {
    constructor() {
        this.page = (req, res) => {
            authentication.db.findOne().then(auth => {
                Product(auth.data.path).findAll().then(product => {
                    Account(auth.data.path).findAll().then(async account => {
                        Warehouse(auth.data.path).findAll().then(async warehouse => {
                            await res.render('home/index')
                            if( product.length == 0 ) {
                                Electron.app.whenReady().then(() => browserWindow.initialInventory(null, 'http://localhost:1400/setting/inventory/initial?newAccount=on', false)).then(() => console.log('Initial inventory form window showed!')).catch(err => console.log(err))
                                Electron.app.whenReady().then(() => browserWindow.warehouse(null, 'http://localhost:1400/product/warehouse/edit?newAccount=on&warehouse=' + warehouse.length, false)).then(() => console.log('Warehouse form window showed!')).catch(err => console.log(err))
                            }
                            if( account.length == 0 ) {
                                Electron.app.whenReady().then(() => browserWindow.form(null, 'http://localhost:1400/setting/account/new?newAccount=on', false)).then(() => console.log('Form window showed!')).catch(err => console.log(err))
                            }
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }
    }
}

module.exports = Home