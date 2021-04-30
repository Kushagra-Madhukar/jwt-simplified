const crypto = require('crypto')
const fs = require('fs')
const decrypt = require('./decrypt')

//This is the data we are receiving from user
const receivedData = require('./signMessage').packageOfDataToSend

const hash = crypto.createHash(receivedData.algorithm)

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8')

const decryptedMessage = decrypt.decryptWithPublicKey(publicKey, receivedData.signedAndEncryptedData)
const decryptedMessageHex = decryptedMessage.toString()

hash.update(JSON.stringify(receivedData.originalData))

const hashOfOriginalHex = hash.digest('hex')

if(hashOfOriginalHex === decryptedMessageHex){
    console.log('Success! The data is not tempered and the user is valid')
} else {
    console.log('Failed! The data is tempered')
}