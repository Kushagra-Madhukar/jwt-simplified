const crypto = require('crypto')

function encryptWithPrivateKey(privateKey, message){

    const bufferMessage = Buffer.from(message, 'utf8')

    return crypto.privateEncrypt(privateKey, bufferMessage)

}

function encryptWithPublicKey(publicKey, encryptedMessage){

    const bufferMessage = Buffer.from(message, 'utf8')

    return crypto.publicEncrypt(publicKey, bufferMessage)
    
}

module.exports.encryptWithPrivateKey = encryptWithPrivateKey
module.exports.encryptWithPublicKey = encryptWithPublicKey