const Electron = require('electron')
const Folder = require('../Models/folder')
const File = require('../Models/file')
const Data = require('../Models/Tables/Data')
const User = require('../Models/Tables/User')
const Log = require('../Models/Tables/Log')
const AuthData = require('../Models/Tables/AuthData')
const moment = require('moment')


module.exports = {
    authenticate: async (data, user) => {
        await new Folder('./', '.appData').read().then(async folder => {
            if( folder.data.includes('authentication.db') == false ) {
                await new File('./.appData', 'authentication', 'db').create('')
            }
        })
        
        let authData = { data, user }
        
        return {
            authNow: async () => {
                await AuthData('./.appData/authentication.db').sync({ force: true })
                if( data != undefined && user != undefined ) {
                    await Log(data.path).create({ targetId: user.id, action: 'login', type: 'user' })
                    await User(data.path).update({ interactDetail: { startTime: moment().format(), endTime: null } }, { where: { id: user.id } })
                    return AuthData('./.appData/authentication.db').create(authData)
                }
            }
        }
    },
    db: AuthData('./.appData/authentication.db'),
    close: async () => {
        let duration = 0
        let userName = 'user'
        let startTimeBefore = null
        let endTimeAfter = moment().format()
        await AuthData('./.appData/authentication.db').findOne().then(async auth => {
            await User(auth.data.path).findOne({ where: { id: auth.user.id } }).then(async user => {
                startTimeBefore = user.interactDetail.startTime
                userName = user.name
                duration = new Date(endTimeAfter) - new Date(startTimeBefore)
                await Log(auth.data.path).create({ targetId: auth.user.id, action: 'logout', type: 'user' })
                await User(auth.data.path).update({ interactDetail: { startTime: startTimeBefore, endTime: endTimeAfter } }, { where: { id: user.id } }).then().catch(err => console.log(err))
                await AuthData('./.appData/authentication.db').destroy({ where: { data: { id: auth.data.id } } }).then().catch(err => console.log(err))
                AuthData('./.appData/authentication.db').create({ data: {}, user: {}, type: 'unauthenticated' }).then().catch(err => console.log(err))
                Data(auth.data.path).sequelize.close()
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
        AuthData('./.appData/authentication.db').sequelize.close()
        console.log(`${userName} has been active for ${(duration / 1000) / 60 < 1 ? 'less than a minute':`${Math.round((duration / 1000) / 60)} minutes`}`)
        return duration
    },
    ensure: (req, res, next) => {
        AuthData('./.appData/authentication.db').findOne().then(auth => {
            return next()
        }).catch(err => {
            console.log(err)
            let errMessage = `pilih-data-sebelum-masuk-halaman`
            res.redirect(`/?animation=off&errorMessage=${errMessage}`)
        })
    }
}