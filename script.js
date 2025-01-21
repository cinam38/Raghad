// تصفية المنتجات
function filterProducts() {
    const filter = document.getElementById('categoryFilter').value;
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        if (filter === 'all' || product.dataset.category === filter) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

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
    return Buffer.from(encrypted).toString('base64');
}

// فك تشفير الرسالة
async function decryptMessage(privateKey, encryptedMessage) {
    const encryptedBuffer = Buffer.from(encryptedMessage, 'base64');
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        privateKey,
        encryptedBuffer
    );
    return new TextDecoder().decode(decrypted);
}

// تفاعلية إضافية
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Website loaded successfully!');
    alert('Welcome to EcoLife Solutions!');

    // إنشاء المفاتيح العامة والخاصة
    const { publicKey, privateKey } = await generateKeyPair();

    // تشفير الرسالة
    document.getElementById('encryptForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const message = document.getElementById('message').value;
        const encrypted = await encryptMessage(publicKey, message);
        document.getElementById('encryptedMessage').textContent = encrypted;
    });

    // فك تشفير الرسالة
    document.getElementById('decryptForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const encryptedInput = document.getElementById('encryptedInput').value;
        const decrypted = await decryptMessage(privateKey, encryptedInput);
        document.getElementById('decryptedMessage').textContent = decrypted;
    });

    // تأثيرات التمرير
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // زر العودة إلى الأعلى
        const backToTopButton = document.getElementById('backToTop');
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // زر العودة إلى الأعلى
    const backToTopButton = document.getElementById('backToTop');
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});