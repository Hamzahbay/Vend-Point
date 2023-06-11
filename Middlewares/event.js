const Electron = require('electron')

module.exports = {
    main: () => {
        Electron.app.on('window-all-closed', () => {
            if( process.platform != 'darwin' ) {
                console.log('Quitting app')
                Electron.app.quit()
            }
        })
        
        Electron.app.on('before-quit', async e => {
            e.preventDefault()
            const Folder = require('./../Models/folder')
            const User = require('./../Models/Tables/User')
            const AuthData = require('./../Models/Tables/AuthData')
            const moment = require('moment')
            console.log('Perfoming tasks before fully quit...')
            await new Folder('./', '.appData').read().then(async fof => {
                if( fof.data.includes('authentication.db') == true ) {
                    await AuthData('./.appData/authentication.db').findOne().then(async auth => {
                        if( auth.type == 'authenticated' ) {
                            await User(auth.data.path).findOne({ where: { id: auth.user.id } }).then(async user => {
                                console.log('Saving necassary data...')
                                await User(auth.data.path).update({ interactDetail: { startTime: user.interactDetail.startTime, endTime: moment().format() } }, { where: { id: user.id } }).then(async () => {
                                    await User(auth.data.path).findOne({ where: { id: user.id } }).then(async user => {
                                        await AuthData('./.appData/authentication.db').create({ data: {}, user: {}, type: 'unauthenticated' }).then().catch(err => console.log(err))
                                        let duration = 0
                                        duration = new Date(user.interactDetail.endTime) - new Date(user.interactDetail.startTime)
                                        console.log('The task has been done')
                                        console.log(`${user.name} has been active for ${(duration / 1000) / 60 < 1 ? 'less than a minute':`${Math.round((duration / 1000) / 60)} minutes`}`)
                                    }).catch(err => console.log(err))
                                }).catch(err => console.log(err))
                            }).catch(err => console.log(err))
                        }
                        if( auth.type != 'authenticated' ) {
                            console.log('No necessary data to save')
                        }
                    }).catch(err => console.log(err))
                } else {
                    console.log('No data even created')
                }
            }).catch(err => console.log(err))
            return Electron.app.exit()
        })
        
        Electron.app.on('quit', e => {
            console.log('App fully closed')
        })
    }
}