const jwt = require('jsonwebtoken')
const fs = require('fs')

const PUB_KEY = fs.readFileSync(__dirname + '/id_rsa_pub.pem')
const PRI_KEY = fs.readFileSync(__dirname + '/id_rsa_priv.pem')

const payloadObj = {
    sub: '1289033',  //user id
    name: 'Kushagra',
    admin: true,
    iat: 1516239022   //issued at
}

//You don't need to provide header object as this will be implemented by the library itself
const signedJWT = jwt.sign(payloadObj, PRI_KEY, {algorithm: 'RS256'})

jwt.verify(signedJWT, PUB_KEY, {algorithms: ['RS256']}, (err, payload) => {
    if(err){
        console.log(err)
    }
    console.log(payload)
})