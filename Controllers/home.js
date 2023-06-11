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

class Home {
    constructor() {
        this.page = (req, res) => {
            authentication.db.findOne().then(auth => {
                Account(auth.data.path).findAll().then(async account => {
                    await res.render('home/index')
                    if( account.length == 0 ) {
                        return Electron.app.whenReady().then(windows => browserWindow.form(null, 'http://localhost:1400/setting/account/new?newAccount=on', false)).then(() => console.log('Form window showed!')).catch(err => console.log(err))
                    }
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }
    }
}

module.exports = Home