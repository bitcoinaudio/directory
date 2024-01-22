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
        console.log("from OG func: ", address, signature, message )
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
    const originalMessage = 'sign';
    const isSigValid = verifySignature(req.query.publicKey, req.query.signedMessage, req.query.originalMessage);

    console.log(publicKey, signedMessage, originalMessage, isSigValid)
    console.log(req.query)
    res.json({ isSigValid });
    
});

app.post('/api/verifyMessage', (req, res) => {
    const network = bitcoin.networks.bitcoin;
    var { publicKey, signedMessage } = req.query;

    var originalMessage = 'sign';
    publicKey = req.query.publicKey;
    signedMessage = req.query.signedMessage;
    const isMesValid = verifyMessage(originalMessage, publicKey,  signedMessage);

    // console.log("kp", kp)
    console.log(req.query)
    res.json({  isMesValid })

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