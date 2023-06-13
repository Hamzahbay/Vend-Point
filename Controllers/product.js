// Import required modules
const Electron = require('electron')
// Browser Windows
const browserWindow = require('./../Middlewares/browserWindows')

// Table Models
const Warehouse = require('../Models/Tables/Warehouse')

// Authentication
const authentication = require('../Config/authentication')

// date time library
const moment = require('moment')

class Product {
    constructor() {
        this.get = {
            page: (req, res) => {
                res.render('product/index')
            },
            addStock: (req, res) => {
                res.render('product/addStock/index', { query: req.query })
            },
            editStock: (req, res) => {
                res.render('product/editStock/index')
            },
            checkStock: (req, res) => {
                res.render('product/checkStock/index')
            },
            warehouse: (req, res) => {
                res.render('product/warehouse/index')
            },
            editWarehouse: (req, res) => {
                res.render('product/warehouse/edit/index', { query: req.query })
            }
        }
        this.post = {
            addStock: (req, res) => {
                
            },
            editWarehouse: (req, res) => {
                let body = req.body
                if( body.status != undefined ) {
                    if( body.status == 'close' ) {
                        Electron.BrowserWindow.getFocusedWindow().closable = true
                        return Electron.BrowserWindow.getFocusedWindow().close()
                    }
                }

                authentication.db.findOne().then(auth => {
                    Warehouse(auth.data.path).findOne({ where: { name: body.name } }).then(warehouse => {
                        if( !warehouse ) {
                            return Warehouse(auth.data.path).create({ name: body.name, note: body.note }).then(wr => {
                                Warehouse(auth.data.path).findAll().then(wr => {
                                    res.redirect('/product/warehouse/edit?newAccount=on&warehouse=' + wr.length)
                                }).catch(err => console.log(err))
                            }).catch(err => console.log(err))
                        } else {
                            return Warehouse(auth.data.path).findAll().then(wr => {
                                res.redirect('/product/warehouse/edit?newAccount=on&errorMessage=duplicated&warehouse=' + wr.length)
                            }).catch(err => console.log(err))
                        }
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }
        }
    }
}

module.exports = Product