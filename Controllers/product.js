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

class ProductPage {
    constructor() {
        this.get = {
            page: (req, res) => {
                authentication.db.findOne().then(auth => {
                    Warehouse(auth.data.path).findAll().then(warehouse => {
                        res.render('product/index', { query: req.query, warehouse })
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            addStock: (req, res) => {
                Electron.app.whenReady().then(() => browserWindow.initialInventory(null, 'http://localhost:1400/product/newStock', true)).then(() => console.log('Add stock form window showed!')).catch(err => console.log(err))
            },
            newStock: (req, res) => {
                authentication.db.findOne().then(auth => {
                    Warehouse(auth.data.path).findAll().then(warehouse => {
                        res.render('product/addStock/index', { query: req.query, warehouse })
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            editStock: (req, res) => {
                Electron.app.whenReady().then(() => browserWindow.initialInventory(null, 'http://localhost:1400/product/updateStock', true)).then(() => console.log('Add stock form window showed!')).catch(err => console.log(err))
            },
            updateStock: (req, res) => {
                authentication.db.findOne().then(auth => {
                    Warehouse(auth.data.path).findAll().then(warehouse => {
                        Product(auth.data.path).findAll().then(product => {
                            res.render('product/editStock/index', { query: req.query, warehouse, product })
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            checkStock: (req, res) => {
                res.render('product/checkStock/index')
            },
            warehouseDetail: (req, res) => {
                authentication.db.findOne().then(auth => {
                    Warehouse(auth.data.path).findAll().then(warehouse => {
                        Electron.app.whenReady().then(() => browserWindow.initialInventory(null, 'http://localhost:1400/product/warehouse/'+req.params.id+'?warehouse=' + warehouse.length, true)).then(() => console.log('Warehouse form window showed!')).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            warehouse: (req, res) => {
                authentication.db.findOne().then(auth => {
                    Warehouse(auth.data.path).findAll().then(warehouse => {
                        Product(auth.data.path).findAll({ where: { warehouseId: req.params.id } }).then(product => {
                            res.render('product/warehouse/index', { query: req.query, warehouse, product, params: req.params })
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            addWarehouse: (req, res) => {
                authentication.db.findOne().then(auth => {
                    Warehouse(auth.data.path).findAll().then(warehouse => {
                        Electron.app.whenReady().then(() => browserWindow.warehouseAfter(null, 'http://localhost:1400/product/warehouse/edit?warehouse=' + warehouse.length, true)).then(() => console.log('Warehouse form window showed!')).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            editWarehouse: (req, res) => {
                res.render('product/warehouse/edit/index', { query: req.query })
            },
            warehouseUpdate: (req, res) => {
                authentication.db.findOne().then(auth => {
                    Warehouse(auth.data.path).findOne({ where: { id: req.params.id } }).then(warehouse => {
                        Electron.app.whenReady().then(() => browserWindow.warehouseAfter(null, 'http://localhost:1400/product/warehouseDetail/modify/' + req.params.id, true)).then(() => console.log('Warehouse form window showed!')).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            warehouseModify: (req, res) => {
                authentication.db.findOne().then(auth => {
                    Warehouse(auth.data.path).findOne({ where: { id: req.params.id } }).then(warehouse => {
                        res.render('product/warehouse/modify/index', { query: req.query, params: req.params, warehouse })
                    })
                })
            }
        }
        this.post = {
            newStock: (req, res) => {
                let body = req.body
                let result = []
                if( Array.isArray(body.name) === false ) {
                    body.name = [body.name]
                    body.warehouse = [body.warehouse]
                    body.unit = [body.unit]
                }
                authentication.db.findOne().then(auth => {
                    Product(auth.data.path).findAll().then(async product => {
                        if( product.some(obj => body.name.find(targ => targ === obj.name)) ) return res.redirect('/product/newStock?errorMessage=duplicated')

                        await body.name.forEach((name, index) => {
                            let existingIndex = result.findIndex(item => item.name === name && item.warehouseId === body.warehouse[index])
                            let qty = 0
                            let price = 0
                            
                            if (existingIndex !== -1) {
                              result[existingIndex].qty += qty
                            } else {
                              result.push({
                                warehouseId: body.warehouse[index],
                                name: name,
                                unit: body.unit[index],
                                detail: [{ price, qty, from: 'add-product', date: moment().format() }]
                              })
                            }
                        })
                          
                        authentication.db.findOne().then(async auth => {
                            await Product(auth.data.path).bulkCreate(result).then(products => {
                                products.forEach(async product => {
                                    await Log(auth.data.path).create({ targetId: product.id, action: 'create', type: 'product' })
                                })
                            }).catch(err => console.log(err))
                            Electron.BrowserWindow.getFocusedWindow().close()
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
                
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
                            return Warehouse(auth.data.path).create({ name: body.name, note: body.note }).then(async wr => {
                                await Log(auth.data.path).create({ targetId: wr.id, action: 'create', type: 'warehouse' })
                                Warehouse(auth.data.path).findAll().then(wr => {
                                    res.redirect('/product/warehouse/edit?newAccount='+req.params.newAccount+'&warehouse=' + wr.length + '&successMessage=' + body.name)
                                }).catch(err => console.log(err))
                            }).catch(err => console.log(err))
                        } else {
                            return Warehouse(auth.data.path).findAll().then(wr => {
                                res.redirect('/product/warehouse/edit?newAccount=on&errorMessage=duplicated&warehouse=' + wr.length)
                            }).catch(err => console.log(err))
                        }
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            updateStock: (req, res) => {
                let body = req.body
                authentication.db.findOne().then(auth => {
                    Product(auth.data.path).findOne({ id: req.params.id }).then(products => {
                        Product(auth.data.path).update({ name: body.name, unit: body.unit }, { where: { id: req.params.id } }).then(async product1 => {
                            await Log(auth.data.path).create({ targetId: req.params.id, action: 'update', type: 'product' })
                            return res.redirect('/product/updateStock')
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            warehouse: (req, res) => {
                let body = req.body
                authentication.db.findOne().then(auth => {
                    Product(auth.data.path).findOne({where: { id: req.params.productId }}).then(product => {
                        let detail = product.detail
                        let opname = detail.reduce((acc, curr) => acc + curr.qty, 0) - body.qty

                        const deductStock = (targetStock, opname) => {
                            let stock = targetStock.map(val => ({ price: val.price, qty: val.qty, from: val.from, date: val.date }))
                            let remainingOpname = opname
                            let deductedStock = []
                          
                            for (let i = 0; i < stock.length; i++) {
                              let currentQty = stock[i].qty
                              let deductedQty = 0
                          
                              if ( currentQty >= 0 ) {
                                deductedQty = Math.min(remainingOpname, currentQty)
                                stock[i].qty -= deductedQty
                                remainingOpname -= deductedQty
                              }

                              
                              deductedStock.push({ price: stock[i].price, qty: deductedQty, from: stock[i].from, date: stock[i].date })
                            }
                            
                            return { updatedStock: stock, deductedStock }
                          }

                        if( product.warehouseId == body.warehouse ) {
                            return Product(auth.data.path).update({ detail: deductStock(detail, opname).updatedStock }, { where: { id: req.params.productId } }).then(async product1 => {
                                await Log(auth.data.path).create({ targetId: req.params.productId, action: 'update', type: 'stock-product' })
                                return res.redirect('/product/warehouse/' + req.params.id + '?successMessage=' + product.name)
                            }).catch(err => console.log(err))
                        } else {
                             if( opname < 0 ) {
                                return res.redirect('/product/warehouse/' + req.params.id + '?errorMessage=' + product.name)
                            }

                            const transferStock = (deductedStock, targetStock) => {
                                let combinedStock = deductedStock.map((val) => {
                                    return { price: val.price, qty: 0, from: val.from, date: val.date }
                                })
                                
                                combinedStock = combinedStock.concat(targetStock)
                                
                                combinedStock = combinedStock.reverse().filter((item, i) => {
                                    return (i == combinedStock.findIndex((val) => {
                                        return val.price == item.price && val.date == item.date
                                    }))
                                })
                                
                                let transferredStock = combinedStock.map((val, i) => {
                                    deductedStock.forEach(x => {
                                        if( x.price == val.price && x.date == val.date ) val.qty += x.qty
                                    })
                                    
                                    return val
                                })
                            
                                transferredStock.sort((a, b) => new Date(a.date) - new Date(b.date))
                                return transferredStock
                            }

                            Product(auth.data.path).findOne({ where: { warehouseId: body.warehouse, name: body.name } }).then(productDiff => {
                                let detailDiff = productDiff?.detail || []
                                console.log(detailDiff)
                                if( productDiff ) {
                                    Product(auth.data.path).update({ detail: deductStock(detail, body.qty).updatedStock }, { where: { id: req.params.productId } }).then(product1 => {
                                        Product(auth.data.path).update({ detail: transferStock(deductStock(detail, body.qty).deductedStock, detailDiff) }, { where: { warehouseId: body.warehouse, name: body.name } }).then(async product2 => {
                                            await Log(auth.data.path).create({ targetId: req.params.productId, action: 'update', type: 'between-warehouse-stock-product' })
                                            await Log(auth.data.path).create({ targetId: productDiff.id, action: 'update', type: 'target-between-warehouse-stock-product' })
                                            return res.redirect('/product/warehouse/' + req.params.id + '?successMessage=' + product.name)
                                        }).catch(err => console.log(err))
                                    }).catch(err => console.log(err))
                                } else {
                                    Product(auth.data.path).update({ detail: deductStock(detail, body.qty).updatedStock }, { where: { id: req.params.productId } }).then(product1 => {
                                        Product(auth.data.path).create({ name: body.name, warehouseId: body.warehouse, unit: body.unit, detail: transferStock(deductStock(detail, body.qty).deductedStock, detailDiff).reverse() }).then(async product2 => {
                                            await Log(auth.data.path).create({ targetId: req.params.productId, action: 'update', type: 'between-warehouse-stock-product' })
                                            await Log(auth.data.path).create({ targetId: product2.id, action: 'create', type: 'target-between-warehouse-stock-product' })
                                            return res.redirect('/product/warehouse/' + req.params.id + '?successMessage=' + product.name)
                                        }).catch(err => console.log(err))
                                    }).catch(err => console.log(err))
                                }
                            }).catch(err => console.log(err))
                        }
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            modifyWarehouse: (req, res) => {
                let body = req.body
                authentication.db.findOne().then(auth => {
                    Warehouse(auth.data.path).findOne({ where: { name: body.name } }).then(warehouse => {
                        if( warehouse && warehouse.id != req.params.id ) {
                            return res.redirect('/product/warehouseDetail/modify/' + req.params.id + '?errorMessage=duplicated')
                        }
                        Warehouse(auth.data.path).update({ name: body.name, note: body.note }, { where: { id: req.params.id } }).then(async wr => {
                            await Log(auth.data.path).create({ targetId: req.params.id, action: 'update', type: 'warehouse' })
                            return Electron.BrowserWindow.getFocusedWindow().close()
                        })
                    }).catch(err => console.log(err))
                })
            }
        }
    }
}

module.exports = ProductPage