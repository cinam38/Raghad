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

// تفاعلية إضافية
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    alert('Welcome to EcoLife Solutions!');

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
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        }
    });

    // زر العودة إلى الأعلى
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
