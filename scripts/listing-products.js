const URL_API_FAKE_STORE = 'https://fakestoreapi.com'

export async function getProducts() {
  try {
    const response = await fetch(`${URL_API_FAKE_STORE}/products`)
    let data = await response.json();
    if (data.lenght === 0) return [];
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error(`Error: ${response.status}`);
  }
}

 export function createProductCard(product) {
  const productCard = document.createElement('section');
  productCard.className = 'product-card';
   productCard.setAttribute('data-product-id', product.id);
   
   const isCartPage = window.location.pathname.includes("cart");

   productCard.innerHTML =
     !isCartPage
      ? `
    <img src="${product.image}" alt="${product.title}" class="product-image" />
    <div class="product-text">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-price">$${product.price}</p>
    </div>

    <button class="add-to-cart-btn btn-card">
      <img src="../assets/cart-icon.svg" alt="Add to Cart">
    </button>

    <button class="add-to-wishlist-btn btn-card">
      <img src="../assets/wishlist-icon.svg" alt="Add to Wishlist">
    </button>
   `
     : `
    <img src="${product.image}" alt="${product.title}" class="product-image" />
    <div class="product-text specs">
      <h3 class="product-title">${product.title}</h3>
      <p>Talle: L</p>

      
      
      <div class="qty-trash">
        <div class="quantity">
          <button class="qty-btn">-</button>
          <span class="qty-value">1</span>
          <button class="qty-btn">+</button>
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

export function displayProducts(products) {
  const productList = document.getElementById('products-container');
  if (!productList) return;

  productList.innerHTML = '';
  products.forEach(product => {
    const productCard = createProductCard(product);
    productList.appendChild(productCard);
  });
}

export function updateProductCount(count) {
  const productCount = document.querySelector('.product-count');
  if (productCount) productCount.textContent = `${count}`;
}
