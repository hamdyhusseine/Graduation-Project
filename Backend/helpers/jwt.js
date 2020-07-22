const jwt = require('jsonwebtoken')
const secret = "qiehquiorhutuqhruijq3r"

module.exports.encode = payload => jwt.sign(payload, secret)
module.exports.decode = token => {
    let decoded = jwt.decode(token, secret)
    console.log('decoded : ', decoded)
    return decoded
}
