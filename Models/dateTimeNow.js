const moment = require('moment')()

module.exports = {
    format: format => {
        return moment.format(format)
    },
    relative: (startEnd, target, format) => {
        if( startEnd.startOf != undefined && startEnd.startOf[0] == true ) {
            return moment(target, format).startOf(startEnd.startOf[1]).fromNow()
        }
    }
}
// module.exports = (keysName, propertiesName, format) => new Intl.DateTimeFormat('id-ID', { [keysName]: propertiesName }).format(format)