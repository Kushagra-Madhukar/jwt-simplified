const base64url = require('base64url')
const issuedJWT = require('./issueJWT')
//base64url is an npm package that you will have to install manually

// const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const JWT = issuedJWT.generateJWT()

const jwtParts = JWT.split(".")

const headerInBase64UrlFormat = jwtParts[0]
const payloadInBase64UrlFormat = jwtParts[1]
const signatureInBase64UrlFormat = jwtParts[2]

const decodedHeader = base64url.decode(headerInBase64UrlFormat)
const decodedPayload = base64url.decode(payloadInBase64UrlFormat)
const decodedSignature = base64url.decode(signatureInBase64UrlFormat)

module.exports = {headerInBase64UrlFormat, payloadInBase64UrlFormat, signatureInBase64UrlFormat}