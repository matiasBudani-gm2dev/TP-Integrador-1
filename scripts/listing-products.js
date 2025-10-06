import { createProductCard, createProductCardCart } from '../utils/product.render.js';

export function displayProducts(products, cart = false) {
  const productList = document.getElementById('products-container');
  if (!productList) return;

  productList.innerHTML = '';
  products.forEach(product => {
    const productCard = cart ? createProductCardCart(product) : createProductCard(product);
    productList.appendChild(productCard);
  });
}
