// إنشاء زوج من المفاتيح (عام وخاص) باستخدام Web Crypto API
async function generateKeyPair() {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: { name: "SHA-256" },
        },
        true,
        ["encrypt", "decrypt"]
    );
    return keyPair;
}

// تشفير الرسالة
async function encryptMessage(publicKey, message) {
    const encodedMessage = new TextEncoder().encode(message);
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        publicKey,
        encodedMessage
    );
    // تحويل ArrayBuffer إلى Base64
    return arrayBufferToBase64(encrypted);
}

// فك تشفير الرسالة
async function decryptMessage(privateKey, encryptedMessage) {
    const encryptedBuffer = base64ToArrayBuffer(encryptedMessage);
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        privateKey,
        encryptedBuffer
    );
    return new TextDecoder().decode(decrypted);
}

// تحويل ArrayBuffer إلى Base64
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// تحويل Base64 إلى ArrayBuffer
function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// تفاعلية إضافية
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Website loaded successfully!');

    // إنشاء المفاتيح العامة والخاصة
    const { publicKey, privateKey } = await generateKeyPair();
    console.log("Public Key:", publicKey);
    console.log("Private Key:", privateKey);

    // تشفير الرسالة
    document.getElementById('encryptForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const message = document.getElementById('message').value;
        console.log("Original Message:", message);
        const encrypted = await encryptMessage(publicKey, message);
        console.log("Encrypted Message:", encrypted);
        document.getElementById('encryptedMessage').textContent = encrypted;
    });

    // فك تشفير الرسالة
    document.getElementById('decryptForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const encryptedInput = document.getElementById('encryptedInput').value;
        console.log("Encrypted Input:", encryptedInput);
        const decrypted = await decryptMessage(privateKey, encryptedInput);
        console.log("Decrypted Message:", decrypted);
        document.getElementById('decryptedMessage').textContent = decrypted;
    });
});         