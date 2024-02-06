const express = require('express');
const bitcoin = require('bitcoinjs-lib');
const { Signer, SignerAsync, ECPairInterface, ECPairFactory, ECPairAPI, TinySecp256k1Interface } = require('ecpair');
const tinysecp = require('tiny-secp256k1');
const ECPair = ECPairFactory(tinysecp);
var bitcoinMessage = require('bitcoinjs-message');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

function verifySignature(address, signature, message) {
    try {
        return bitcoinMessage.verify(address, signature, message);
    } catch (e) {
        return false;
    }
}
function verifyMessage(address, signature, message) {
    try {
        console.log("from OG func: ", address, signature, message )
        return bitcoinMessage.verify(originalMessage, publicKey,  signedMessage);
    } catch (e) {
        return false;
    }
}
app.use(bodyParser.json());

app.post('/api/verifySignature', (req, res) => {

    const { publicKey, signedMessage } = req.query;
    const originalMessage = "signed this message";
    const isSigValid = verifySignature(req.query.publicKey, req.query.signedMessage, req.query.originalMessage);

    console.log(publicKey, signedMessage, originalMessage, isSigValid)
    console.log(req.query)
    res.json({ isSigValid });
    
});

app.post('/api/verifyMessage', (req, res) => {

    var address = req.query.address;
    var message = req.query.message
    var signature = req.query.signature;
    console.log(address, message, signature)

    const isMesValid = (bitcoinMessage.verify(message, address, signature))
// => true
    console.log(isMesValid)
    res.json({ isMesValid} )

});

app.get('/api/signMessage', (req, res) => {
var keyPair = ECPair.fromWIF('KyatKtdVaboeVJ8nE1g5VvQpU23R5pezeVvK9bvZxPLSwUh9SJ5J')
var privateKey = keyPair.privateKey
var message = 'Bitcoin Audio is RAD!'

var signature = bitcoinMessage.sign(message, privateKey, keyPair.compressed)
console.log(signature.toString('base64'))
// => 'H9L5yLFjti0QTHhPyFrZCT1V/MMnBtXKmoiKDZ78NDBjERki6ZTQZdSMCtkgoNmp17By9ItJr8o7ChX0XxY91nk='

res.json( signature.toString('base64') )   

});

app.post('/api/check', (req, res) => {
    const check = "check" 
    console.log("check!")
    res.json({ check });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', '*', 'default-src'], 
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Backend is running');
  });