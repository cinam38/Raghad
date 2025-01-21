const crypto = require('crypto');

// إنشاء زوج من المفاتيح (عام وخاص)
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // طول المفتاح
});

// الرسالة التي نريد تشفيرها
const message = "Hello, EcoLife Solutions!";

// تشفير الرسالة باستخدام المفتاح العام
const encrypted = crypto.publicEncrypt(
    {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
    },
    Buffer.from(message)
);

console.log("Encrypted Message:", encrypted.toString('base64'));

// فك تشفير الرسالة باستخدام المفتاح الخاص
const decrypted = crypto.privateDecrypt(
    {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
    },
    encrypted
);

console.log("Decrypted Message:", decrypted.toString());