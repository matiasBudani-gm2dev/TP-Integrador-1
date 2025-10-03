import { getProducts, displayProducts } from "./listing-products.js";
import { toggleCart, syncButtonsFromStorage, removeFromCart } from "./cart-wishlist.js";

async function renderCart() {
  const products = await getProducts();
  const cartIds = JSON.parse(localStorage.getItem('cart') || "[]");
  const map = new Map(products.map(p => [Number(p.id), p]));
  const cartProducts = cartIds.map(id => map.get(Number(id))).filter(Boolean);
  displayProducts(cartProducts);
  syncButtonsFromStorage();
}

await renderCart();

const container = document.getElementById("products-container");
if (container) {
  container.addEventListener("click", (e) => {
    const cartBtn = e.target.closest(".delete-product-cart");
    if (!cartBtn) return;

    const card = cartBtn.closest(".product-card");
    if (!card) return;

    const id = Number(card.dataset.productId);
    if (Number.isNaN(id)) return;

    toggleCart(id, cartBtn);

    card.remove();
  });
}



const prices = [...document.querySelectorAll('.cart-price')]
    .map(el => Number(el.textContent));
  
const hola = prices.reduce((a, c) => {
  return a + c;
}, 0);

console.log(hola);

// max 10

//pongo un prod
//agarro su id y lo uso para borrarlo y para modificar 