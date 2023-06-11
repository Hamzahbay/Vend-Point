// Import required modules
const Electron = require('electron')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const { urlencoded, json } = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const { join, dirname } = require('path')

// Browser Windows
const browserWindow = require('./Middlewares/browserWindows')
// Electron event
const event = require('./Middlewares/event')

// Create a new Express application & set socket.io
const app = express()
const server = http.createServer(app)
const io = new socketIO.Server(server)

// set up io event listeners onn server side
io.on('connection', socket => {
    console.log('A client has connected')

    socket.on('chat message', message => {
        console.log('Received chat message:', message)
        io.emit('chat message', message)
    })
    socket.on('disconnect', () => {
        console.log('A client has disconnected')
    })
})

// Set the port to listen on
const port = 1400

// Disabling Hardware Acceleration
Electron.app.disableHardwareAcceleration()

// Set up passport middleware
// app.use(passport.initialize())
// app.use(passport.session())

// Configure app to use sessions
app.use(session({
    secret: 'obviously',
    resave: true,
    saveUninitialized: true
}))

// Configure app to use flash messages
app.use(flash())

// Set global variables for flash messages
app.use((request ,response, next) => {
    response.locals.success_message = request.flash('green')
    response.locals.error_message = request.flash('red')
    response.locals.warning_message = request.flash('yellow')
    next()
})

// Set view engine and views directory
app.set('views', join(__dirname, 'Views'))
app.set('view engine', 'ejs')

// Configure app to use body parser for URL encoded and JSON data
app.use(urlencoded({ extended: false }))
app.use(json())

// Set directory for serving static files
app.use(express.static(join(__dirname, 'public')))

// Set up routes using Express Router
const landingPageRouter = require('./Routers/landingPage')
const homeRouter = require('./Routers/home')
const productRouter = require('./Routers/product')
const sellingRouter = require('./Routers/selling')
const purchaseRouter = require('./Routers/purchase')
const expensesRouter = require('./Routers/expenses')
const inclusionRouter = require('./Routers/inclusion')
const reportRouter = require('./Routers/report')
const settingRouter = require('./Routers/setting')

app.use('/', landingPageRouter)
app.use('/home', homeRouter)
app.use('/product', productRouter)
app.use('/selling', sellingRouter)
app.use('/purchase', purchaseRouter)
app.use('/expenses', expensesRouter)
app.use('/inclusion', inclusionRouter)
app.use('/report', reportRouter)
app.use('/setting', settingRouter)

// Start listening for requests
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// Run main windows
Electron.app.whenReady().then(() => browserWindow.main(null, `http://localhost:${port}/`)).then(() => console.log('Success Create Application!')).catch(err => console.log(err))

// Run main browserWindows event
event.main()




















































// // package / framework
// // const Electron = require('electron')
// const express = require('express')
// const { urlencoded, json } = require('express')
// const sqlite3 = require('sqlite3').verbose()
// const session = require('express-session')
// const flash = require('connect-flash')
// const passport = require('passport')
// const fileURLToPath = require('url')
// const { join, dirname } = require('path')

// // variables
// const app = express()
// const port = 1400
// // const __filename = fileURLToPath(import.meta.url)
// // const __dirname = dirname(__filename)

// //Disabling Hardware Acceleration
// // Electron.app.disableHardwareAcceleration()

// // passport middleware
// // app.use(passport.initialize())
// // app.use(passport.session())

// // app Session
// app.use(session({
//     secret: 'obviously',
//     resave: true,
//     saveUninitialized: true
// }))

// // connect flash
// app.use(flash())

// // global variable
// app.use((request ,response, next) => {
//     response.locals.success_message = request.flash('green')
//     response.locals.error_message = request.flash('red')
//     response.locals.warning_message = request.flash('yellow')
//     next()
// })

// // view engine
// app.set('views', join(__dirname, '/Views/'))
// app.set('view engine', 'ejs')

// // body parser
// app.use(urlencoded({ extended: false }))
// app.use(json())

// // public access
// app.use(express.static(join(__dirname, 'public')))

// // page router
// app.use('/', require('./Router/landingPage'))
// app.use('/home', require('./Router/home'))
// app.use('/product', require('./Router/product'))
// app.use('/selling', require('./Router/selling'))
// app.use('/purchase', require('./Router/purchase'))
// app.use('/expenses', require('./Router/expenses'))
// app.use('/inclusion', require('./Router/inclusion'))
// app.use('/report', require('./Router/report'))

// // just for sample
// const db = new sqlite3.Database('Data/vendPoint.db')

// db.serialize(() => {
//     db.run("CREATE TABLE lorem (info TEXT)")

//     const stmt = db.prepare("INSERT INTO lorem VALUES (?)")
//     for (let i = 0; i < 10; i++) {
//         stmt.run("Ipsum " + i)
//     }
//     stmt.finalize()

//     db.each("SELECT * FROM lorem", (err, row) => {
//         // console.log(row.id + ": " + row.info)
//         console.log(row.id + ": " + row.info)
//     });
// });

// db.close();

// // run server
// app.listen(port, console.log(`Server is Running on Port ${port}`))