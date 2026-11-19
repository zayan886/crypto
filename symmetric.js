// import SHA1 from crypto package 
let crypto = require("crypto")
// import public and private key files
let privateKey = "private.pem";
let plainText = "the value is 1000"
//create a variable where you'll be storing the encrypted value and initialize with blank string
let encText = "";
//Store the decrypted data in the bellow variable
let decText = "";

const algorithm = 'aes-256-cbc';
// In your lab you might already have a key and iv given.
// Here we just create some for the example:
const key = crypto.randomBytes(32); // 256-bit key
const iv  = crypto.randomBytes(16); // 128-bit IV

// Encrypt
const cipher = crypto.createCipheriv(algorithm, key, iv);
encText = cipher.update(plainText, 'utf8', 'hex');
encText += cipher.final('hex');

// Decrypt
const decipher = crypto.createDecipheriv(algorithm, key, iv);
decText = decipher.update(encText, 'hex', 'utf8');
decText += decipher.final('utf8');

// Print decrypted text
console.log(encText)
console.log(decText)
