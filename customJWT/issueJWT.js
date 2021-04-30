const base64url = require('base64url')
const crypto = require('crypto')
const signatureFunction = crypto.createSign('RSA-SHA256')
const fs = require('fs')

const headerObj = {
    alg: 'RS256',
    type: 'JWT'
}

const payloadObj = {
    sub: '1289033',  //user id
    name: 'Kushagra',
    admin: true,
    iat: 1516239022   //issued at
}

function generateJWT(){
    const headerObjString = JSON.stringify(headerObj)
    const payloadObjString = JSON.stringify(payloadObj)

    const base64UrlHeader = base64url(headerObjString)
    const base64UrlPayload = base64url(payloadObjString)

    signatureFunction.write(base64UrlHeader + '.' + base64UrlPayload)
    signatureFunction.end()

    const PRIVATE_KEY = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8')
    const signatureBase64 = signatureFunction.sign(PRIVATE_KEY, 'base64')

    const signatureBase64Url = base64url.fromBase64(signatureBase64)

    const JWT = base64UrlHeader + '.' + base64UrlPayload + '.' + signatureBase64Url

    return JWT
}

module.exports.generateJWT = generateJWT