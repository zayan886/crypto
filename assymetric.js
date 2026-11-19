const crypto = require('crypto');
const fs = require('fs');

// Provide the missing input
const sourceData = "Hello, this is a secret message!";

// Use Buffer.from instead of the deprecated new Buffer()
let bufferValue = Buffer.from(sourceData, 'utf8');

// Generate matching RSA key pair since the existing files contained mismatched keys
console.log("Generating new 2048-bit RSA key pair...");
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

// Save the new matching keys to the files
fs.writeFileSync('public.pem', publicKey);
fs.writeFileSync('pri.pem', privateKey);
console.log("Keys saved to 'public.pem' and 'pri.pem'.\n");

// store the encrypted data in the bellow variable
// By default, this uses crypto.constants.RSA_PKCS1_OAEP_PADDING
let asmEnc = crypto.publicEncrypt(publicKey, bufferValue);

// Print the encrypted text in console.
console.log("Encrypted:", asmEnc.toString('base64'));

// decryption
let asmDec = crypto.privateDecrypt(privateKey, asmEnc);

console.log("\nDecrypted:", asmDec.toString('utf8'));
