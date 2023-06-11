const Electron = require('electron')

let mainWindows = null

module.exports = {
    main: (stage, url) => {
        stage = new Electron.BrowserWindow({
            minWidth: 900, minHeight: 500,
            // icon: './build/gearico.ico'
        })
    
        //Load Server URL
        stage.loadURL(url)
        
        //Open Electron Desktop
        stage.on('ready-to-show', () => {
            stage.show()
            stage.maximize()
        })

        mainWindows = stage
    },
    form: (stage, url, closable) => {
        stage = new Electron.BrowserWindow({
            minWidth: 700, minHeight: 500, maxWidth: 900, maxHeight: 600, width: 700, height: 500, maximizable: false, minimizable: false, focusable: true, hasShadow: true, modal: true, show: false, parent: mainWindows, closable
        })

        stage.loadURL(url)
        stage.on('ready-to-show', () => {
            stage.show()
            stage.center()
        })
        stage.on('show', () => {
            stage.focus()
        })
        stage.on('close', () => {
            stage = null
        })
    },
    initialInventory: (stage, url, closable) => {
        stage = new Electron.BrowserWindow({
            minWidth: 900, minHeight: 600, maxWidth: 1200, maxHeight: 650, width: 900, height: 600, maximizable: false, minimizable: false, focusable: true, hasShadow: true, modal: true, show: false, parent: mainWindows, closable
        })

        stage.loadURL(url)
        stage.on('ready-to-show', () => {
            stage.show()
            stage.center()
        })
        stage.on('show', () => {
            stage.focus()
        })
        stage.on('close', () => {
            stage = null
        })
    }
}