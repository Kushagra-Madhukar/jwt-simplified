const crypto = require('crypto')
const verifyFunction = crypto.createVerify('RSA-SHA256')
const base64url = require('base64url')
const base64urlformat = require('./decodeJWT')
const fs = require('fs')

const base64urlHeader = base64urlformat.headerInBase64UrlFormat
const base64urlPayload = base64urlformat.payloadInBase64UrlFormat
const base64urlSignature = base64urlformat.signatureInBase64UrlFormat
// console.log(base64urlHeader, base64urlPayload, base64urlSignature)

verifyFunction.write(base64urlHeader + '.' + base64urlPayload)
verifyFunction.end()

const jwtSignatureBase64 = base64url.toBase64(base64urlSignature) 
//since base64url lib only takes base64 values so convert base64url to base64 first

const PUBLIC_KEY = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8')

const signatureIsValid = verifyFunction.verify(PUBLIC_KEY, jwtSignatureBase64, 'base64')
console.log(signatureIsValid)