export function createProductCard(product) {
  const productCard = document.createElement('section');
  productCard.className = 'product-card';
  productCard.setAttribute('data-product-id', product.id);

  productCard.innerHTML =
    `
    <a href="product-detail.html?item=${product.id}">
    <img src="${product.image}" alt="${product.title}" class="product-image" />
    <div class="product-text">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-price">$${product.price}</p>
    </div>
    </a>

    <button class="add-to-cart-btn btn-card">
      <img src="../assets/cart-icon.svg" alt="Add to Cart">
    </button>

    <button class="add-to-wishlist-btn btn-card">
      <img src="../assets/wishlist-icon.svg" alt="Add to Wishlist">
    </button>
     `;
  return productCard;
}

export function createProductCardCart(product) {
  const productCard = document.createElement("section");
  productCard.className = "product-card";
  productCard.setAttribute("data-product-id", product.id);
  productCard.setAttribute("data-price", product.price); // guardo el precio base

  productCard.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="product-image" />
    <div class="product-text specs">
      <h3 class="product-title">${product.title}</h3>
      <p>Talle: L</p>

      <div class="qty-trash">
        <div class="quantity">
          <button class="qty-btn decrement">−</button>
          <span class="qty-value">1</span>
          <button class="qty-btn increment">+</button>
        </div>

        <div class="delete-product-cart">
          <img class="icon" src="../assets/trash-icon.svg"/>
          <p>Eliminar</p>
        </div>
      </div>
    </div>

    <p class="product-price">$<span class="cart-price">${product.price}</span></p>
  `;
  return productCard;
}
