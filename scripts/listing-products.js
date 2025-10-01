async function getProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

function createProductCard(product) {
  const productCard = document.createElement('section');
  productCard.className = 'product-card';

   productCard.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="product-image" />
    <div class="product-text">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-price">$${product.price}</p>
    </div>
    <button class="add-to-cart-btn btn-card"><img src="../assets/cart-icon.svg" alt="Add to Cart"></button>
    <button class="add-to-wishlist-btn btn-card"><img src="../assets/wishlist-icon.svg" alt="Add to Wishlist"></button>
  `;

  return productCard;
}

function displayProducts(products) {
  const productList = document.getElementById('products-container');
  productList.innerHTML = '';
  products.forEach(product => {
    const productCard = createProductCard(product);
    productList.appendChild(productCard);
  });
}

function updateProductCount(count) {
  const productCount = document.querySelector('.product-count');
  productCount.textContent = `${count}`;
}

async function init() {
  const products = await getProducts();
  displayProducts(products);
  updateProductCount(products.length);
}

document.addEventListener("DOMContentLoaded", init);
