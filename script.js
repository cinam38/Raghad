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
