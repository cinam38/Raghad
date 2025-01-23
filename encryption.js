// إنشاء زوج من المفاتيح (عام وخاص) باستخدام Web Crypto API
async function generateKeyPair() {
    try {
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
    } catch (error) {
        console.error("Error generating key pair:", error);
        alert("An error occurred while generating keys. Please try again.");
        throw error;
    }
}

// تشفير الرسالة
async function encryptMessage(publicKey, message) {
    try {
        if (!message) {
            throw new Error("Message is required.");
        }
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
    } catch (error) {
        console.error("Error encrypting message:", error);
        alert("An error occurred while encrypting the message. Please try again.");
        throw error;
    }
}

// فك تشفير الرسالة
async function decryptMessage(privateKey, encryptedMessage) {
    try {
        if (!encryptedMessage) {
            throw new Error("Encrypted message is required.");
        }
        const encryptedBuffer = base64ToArrayBuffer(encryptedMessage);
        const decrypted = await window.crypto.subtle.decrypt(
            {
                name: "RSA-OAEP",
            },
            privateKey,
            encryptedBuffer
        );
        return new TextDecoder().decode(decrypted);
    } catch (error) {
        console.error("Error decrypting message:", error);
        alert("An error occurred while decrypting the message. Please check the input and try again.");
        throw error;
    }
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
    try {
        const binaryString = window.atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    } catch (error) {
        console.error("Error converting Base64 to ArrayBuffer:", error);
        alert("Invalid Base64 input. Please check the encrypted message.");
        throw error;
    }
}

// نسخ النص إلى الحافظة
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert("Text copied to clipboard!");
        })
        .catch((error) => {
            console.error("Failed to copy text:", error);
            alert("Failed to copy text. Please try again.");
        });
}

// تفاعلية إضافية
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Website loaded successfully!');

    let publicKey, privateKey;

    try {
        // إنشاء المفاتيح العامة والخاصة
        const keyPair = await generateKeyPair();
        publicKey = keyPair.publicKey;
        privateKey = keyPair.privateKey;
        console.log("Public Key:", publicKey);
        console.log("Private Key:", privateKey);
    } catch (error) {
        console.error("Failed to generate keys:", error);
        return;
    }

    // تشفير الرسالة
    document.getElementById('encryptForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const message = document.getElementById('message').value;
        try {
            const encrypted = await encryptMessage(publicKey, message);
            document.getElementById('encryptedMessage').innerHTML = `<p>${encrypted}</p>`;
            document.getElementById('copyEncrypted').style.display = 'inline-block';
        } catch (error) {
            document.getElementById('encryptedMessage').innerHTML = `<p class="text-danger">Encryption failed.</p>`;
            document.getElementById('copyEncrypted').style.display = 'none';
        }
    });

    // فك تشفير الرسالة
    document.getElementById('decryptForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const encryptedInput = document.getElementById('encryptedInput').value;
        try {
            const decrypted = await decryptMessage(privateKey, encryptedInput);
            document.getElementById('decryptedMessage').innerHTML = `<p>${decrypted}</p>`;
            document.getElementById('copyDecrypted').style.display = 'inline-block';
        } catch (error) {
            document.getElementById('decryptedMessage').innerHTML = `<p class="text-danger">Decryption failed.</p>`;
            document.getElementById('copyDecrypted').style.display = 'none';
        }
    });

    // نسخ النص المشفر
    document.getElementById('copyEncrypted').addEventListener('click', function() {
        const encryptedText = document.querySelector('#encryptedMessage p').textContent;
        copyToClipboard(encryptedText);
    });

    // نسخ النص المفكوك
    document.getElementById('copyDecrypted').addEventListener('click', function() {
        const decryptedText = document.querySelector('#decryptedMessage p').textContent;
        copyToClipboard(decryptedText);
    });
});