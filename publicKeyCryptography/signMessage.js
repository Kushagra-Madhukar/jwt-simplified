const crypto = require('crypto')
const hash = crypto.createHash('sha256')
const fs = require('fs')
const encrypt = require('./encrypt')
const decrypt = require('./decrypt')

const data = {
    firstName: "Kushagra",
    lastName: "Madhukar",
    isAdmin: true
}
const myDataString = JSON.stringify(data)
console.log('mydatastring', myDataString)

hash.update(myDataString)

const hashedData = hash.digest('hex')
console.log(hashedData)

const senderPrivateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8'); 

const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData)

const packageOfDataToSend = {
    algorithm: 'sha256',
    originalData: data,
    signedAndEncryptedData: signedMessage
}

module.exports.packageOfDataToSend = packageOfDataToSend