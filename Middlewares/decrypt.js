const crypto = require('crypto')

module.exports = (algorithm, key, iv, target) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    let decrypted = decipher.update(target, 'hex', 'utf-8')
    return decrypted + decipher.final('utf-8')
}