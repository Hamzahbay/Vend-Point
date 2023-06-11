// built-in
const os = require('os')
const crypto = require('crypto')

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

// Encrypt and decrypt middleware
const encryption = require('../Middlewares/encrypt')
const decryption = require('../Middlewares/decrypt')
// Bcrypt
const bcrypt = require('bcrypt')

// Authentication
const authentication = require('../Config/authentication')

// Variable
let folderPath = null
// Set date and time // region : device setting
const date = new Date()
// date time library
const moment = require('moment')

// Controllers
class LandingPage {
    constructor() {
        this.get = {
            page: async (req, res) => {
                new Folder('.', '/').read().then(fof => {
                    if( fof.data.includes('.appData') == false ) {
                        new Folder('.', '.appData').create().then(fd => {
                            new File(fd.fullPath, 'data', 'db').create('').then().catch(err => console.log(err))
                            new File(fd.fullPath, 'license', 'db').create('').then().catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    } else {
                        new Folder('.', '.appData').read().then(fof => {
                            if( fof.data.includes('data.db') == false ) new File(fof.fullPath, 'data', 'db').create('').then().catch(err => console.log(err))
                            if( fof.data.includes('license.db') == false ) new File(fof.fullPath, 'license', 'db').create('').then().catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    }
                }).catch(err => console.log(err))
                await Data('./.appData/data.db').sequelize.sync()
                Data('./.appData/data.db').findAll().then(async data => {
                    let dateEnd = []
                    for( let x = 0; x < data.length; x++ ) {
                        await User(data[x].path).findAll().then(user => {
                            user.sort((a, b) => new Date(a.interactDetail.endTime) - new Date(b.interactDetail.endTime))
                            let selectedUser = user.shift()
                            let et = selectedUser.interactDetail.endTime
                            dateEnd.push({ name: selectedUser.name, time: et == null ? 'Kesalahan saat menutup aplikasi' : moment(et).locale('id').format('MMMM DD YYYY - HH:mm'), fullTime: et })
                        }).catch(err => console.log(err))
                    }
                    data = data.map((val, i) => ({ data: val, endTime: dateEnd[i] }))
                    data.sort((a, b) => new Date(a.endTime.fullTime) - new Date(b.endTime.fullTime)).reverse()
                    let dataOption = data.slice(0, Math.min(data.length, 3))
                    res.render('landingPage/index', { dataQuery: req.query, dataOption })
                }).catch(err => console.log(err))
            },
            loading: (req, res) => {
                res.render('loadingScreen/index', { query: req.query })
            },
            register: (req, res) => {
                res.render('landingPage/register/index', { folderPath, dataQuery: req.query })
                folderPath = null
            },
            openData: (req, res) => {
                Data('./.appData/data.db').findOne({ where: { id: req.query.id } }).then(data => {
                    if( data ) {
                        Data(data.path).findAll().then(data1 => {
                            if( data.setPassword == true ) {
                                return res.render('landingPage/login/index', { query: req.query })
                            }
                            if( data.setPassword == false ) {
                                return res.redirect(`/open-data/login/${data.id}`)
                            }
                        }).catch(err => {
                            console.log(err)
                            let errMessage = `data-tidak-ditemukan`
                            res.redirect(`/?animation=off&errorMessage=${errMessage}`)
                        })
                    } else {
                        let errMessage = `kesalahan-pengambilan-data`
                        res.redirect(`/?animation=off&errorMessage=${errMessage}`)
                    }
                }).catch(err => console.log(err))
            },
            registerOpenDialog: (req, res) => {
                const{ dialog } = require('electron')
                dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
                    if( !result.canceled ) {
                        folderPath = result.filePaths[0]
                        res.redirect(`/register?dataName=${req.query.dataName}&passwordChecker=${req.query.passwordChecker}`)
                    }
                }).catch(err => console.log(err))
            },
            openDataOpenDialog: (req, res) => {
                const{ dialog } = require('electron')
                let errMessage = ''
                dialog.showOpenDialog(({
                    title: 'Select File',
                    buttonLabel: 'Select',
                    filters: [ { name: 'Data Files', extensions: 'db' } ],
                    properties: ['openFile']
                })).then(result => {
                    if( !result.canceled ) {
                        Data(result.filePaths[0]).findOne().then(data => {
                            let dataPath = encodeURIComponent(result.filePaths[0])
                            if( data.setPassword == true ) {
                                return res.redirect(`/open-data?id=${data.id}&path=${dataPath}`)
                            }
                            if( data.setPassword == false ) {
                                return res.redirect(`/open-data/login/${data.id}?path=${dataPath}`)
                            }
                        }).catch(err => {
                            console.log(err)
                            errMessage = `data-tidak-ditemukan`
                            res.redirect(`/?animation=off&errorMessage=${errMessage}`)
                        })
                    }
                }).catch(err => console.log(err))
            },
            login: (req, res) => {
                Data('./.appData/data.db').findOne({ where: { id: req.params.id } }).then(async data => {
                    if( req.query.path != data.path ) {
                        await Data(req.query.path).update({ path: req.query.path }, { where: { id: req.params.id } })
                        await Data('./.appData/data.db').update({ path: req.query.path }, { where: { id: req.params.id } })
                    }
                    let dataPath = req.query.path || data.path
                    if( data.setPassword == false ) {
                        Data(dataPath).findOne().then(data => {
                            User(dataPath).findOne().then(async user => {
                                return (await authentication.authenticate(data, user)).authNow().then(auth => {
                                    console.log(`${auth.user.name} from ${auth.data.name} data has been authenticated`)
                                    res.redirect('/home?justRegistered=on&dataName=' + data.name)
                                }).catch(err => console.log(err))
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    } else {
                        let errMessage = `terjadi-kesalahan`
                        res.redirect(`/?animation=off&errorMessage=${errMessage}`)
                    }
                }).catch(err => console.log(err))
            },
            logout: async (req, res) => {
                await authentication.close()
                console.log('Deauthentication successfully')
                let logoutMessage = 'berhasil-keluar-data'
                res.redirect(`/?animation=off&errorMessage=${logoutMessage}`)
            }
        }
        this.post = {
            register: (req, res) => {
                const body = req.body
                const params = req.params
                
                let dirPath = body.dirPath
                let dataName = params.dataName
                
                let setPassword = params.passwordChecker == 'on' ? true:false
                let password = body.password || 'not-set'
                
                let errMessage = ''

                let loadingTime = os.freemem() <= 4000318464 ? 1000:500

                new Folder(dirPath, dataName).create().then(folder => {
                    new File(folder.fullPath, 'data', 'db').create('').then(async file => {
                        await Data('./.appData/data.db').sequelize.sync()
                        await Data(file.fullPath).sequelize.sync({ force: true })
                        await User(file.fullPath).sequelize.sync({ force: true })
                        await Account(file.fullPath).sequelize.sync({ force: true })
                        await Buyer(file.fullPath).sequelize.sync({ force: true })
                        await Expenses(file.fullPath).sequelize.sync({ force: true })
                        await ExpensesInvoice(file.fullPath).sequelize.sync({ force: true })
                        await Inclusion(file.fullPath).sequelize.sync({ force: true })
                        await InclusionInvoice(file.fullPath).sequelize.sync({ force: true })
                        await Supplier(file.fullPath).sequelize.sync({ force: true })
                        await Selling(file.fullPath).sequelize.sync({ force: true })
                        await SellingInvoice(file.fullPath).sequelize.sync({ force: true })
                        await Product(file.fullPath).sequelize.sync({ force: true })
                        await Purchase(file.fullPath).sequelize.sync({ force: true })
                        await PurchaseInvoice(file.fullPath).sequelize.sync({ force: true })
                        await Memo(file.fullPath).sequelize.sync({ force: true })

                        if( setPassword == true ) {
                            let salt = bcrypt.genSaltSync(10)
                            password = bcrypt.hashSync(password, salt)
                        }

                        Data('./.appData/data.db').create({ name: dataName, path: file.fullPath, permission: 'granted', setPassword }).then(dataApp => {
                            loadingTime += 100
                            Data(file.fullPath).create({ id: dataApp.id, name: dataName, path: file.fullPath, permission: 'granted', setPassword }).then(data => {
                                loadingTime += 100
                                User(file.fullPath).create({ name: body.name, password, role: 'admin', authority: { type: 'default', level: 'full-access' } }).then(async user => {
                                    loadingTime += 100
                                    ;(await authentication.authenticate(data, user)).authNow().then(auth => {
                                        loadingTime += 100
                                        return setTimeout(() => res.redirect('/home?justRegistered=on&dataName=' + dataName), loadingTime <= 2000318464 ? loadingTime+1000:loadingTime)
                                    }).catch(err => console.log(err))
                                }).catch(err => console.log(err))
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    }).catch(err => {
                        errMessage = 'Terdapat-nama-folder-atau-nama-file-yang-serupa-pada-folder-yang-anda-pilih'
                        res.redirect(`/register?dataName=${dataName}&passwordChecker=${params.passwordChecker}&errorMessage=${errMessage}`)
                        console.log(err)
                    })
                }).catch(err => {
                    errMessage = 'Terdapat-nama-folder-atau-nama-file-yang-serupa-pada-folder-yang-anda-pilih'
                    res.redirect(`/register?dataName=${dataName}&passwordChecker=${params.passwordChecker}&errorMessage=${errMessage}`)
                    console.log(err)
                })
            },
            login: (req, res) => {
                let errMessage = ''
                Data('./.appData/data.db').findOne({ where: { id: req.params.id } }).then(async data => {
                    if( req.query.path != data.path ) {
                        await Data(req.query.path).update({ path: req.query.path }, { where: { id: req.params.id } })
                        await Data('./.appData/data.db').update({ path: req.query.path }, { where: { id: req.params.id } })
                    }
                    let dataPath = req.query.path || data.path
                    Data(dataPath).findOne({ where: { id: data.id } }).then(data => {
                        if( data.setPassword == true ) {
                            User(dataPath).findOne({ where: { name: req.body.name } }).then(async user => {
                                if( user ) {
                                    if( bcrypt.compareSync(req.body.password, user.password) == true ) {
                                        return (await authentication.authenticate(data, user)).authNow().then(auth => {
                                            console.log(`${auth.user.name} from ${auth.data.name} data has been authenticated`)
                                            res.redirect('/home?justRegistered=on&dataName=' + data.name)
                                        }).catch(err => console.log(err))
                                    } else {
                                        errMessage = 'kata-sandi-salah'
                                        res.redirect(`/open-data?id=${req.params.id}&errorMessage=${errMessage}&name=${user.name}`)
                                    }
                                } else {
                                    errMessage = 'pengguna-tidak-terdaftar'
                                    res.redirect(`/open-data?id=${req.params.id}&errorMessage=${errMessage}`)
                                }
                            }).catch(err => console.log(err))
                        } else {
                            let errMessage = `terjadi-kesalahan`
                            res.redirect(`/?animation=off&errorMessage=${errMessage}`)
                        }
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }
        }
    }
}

module.exports = LandingPage