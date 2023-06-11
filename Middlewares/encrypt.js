const crypto = require('crypto')

module.exports = (algorithm, key, iv, target) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(target, 'utf-8', 'hex')
    return encrypted + cipher.final('hex')
}

// f2e66855484cbd63f35d838596105f53b196e69acd0c1198d078970f87636e90
// 812e63c9b7d2a4dd944e809d89f95c8d