import { displayProducts } from "./listing-products.js";
import { toggleCart, syncButtonsFromStorage, updateCartCount } from "./cart-wishlist.js";
import { storageService } from "../utils/localStorage.js";

let cartIds = [];
let maxQuantyProduct = 10;

function renderCart() {
  const products = storageService.getProducts();

  cartIds = storageService.get('cart');

  const map = new Map(products.map(p => [Number(p.id), p]));
  const cartProducts = cartIds.map(id => map.get(Number(id))).filter(Boolean);

  displayProducts(cartProducts, true);
  syncButtonsFromStorage();
  updateCartCount();
  updateTotalPrice();
}

function updateTotalPrice() {
  const prices = [...document.querySelectorAll(".cart-price")].map(el => Number(el.textContent));
  const total = prices.reduce((a, c) => a + c, 0);
  const $total = document.getElementById("total-price-cart");
  if ($total) $total.textContent = `$${total.toFixed(2)}`;
}

renderCart();

const $productsCartContainer = document.getElementById("products-cart-container");

$productsCartContainer.insertAdjacentHTML(
  "afterbegin",
  cartIds.length > 0 ?
    `
  <div class="heading">
    <p>producto</p>
    <p>total</p>
  </div>
  `
    :
    `
  <h3><a href="../pages/product-listing-page.html">no hay productos en tu carrito</a></h3>
  `
);

const container = document.getElementById("products-container");
if (container) {
  container.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const id = Number(card.dataset.productId);
    if (Number.isNaN(id)) return;

    if (e.target.closest(".delete-product-cart")) {
      toggleCart(id, e.target);
      card.remove();
      updateCartCount();
      updateTotalPrice();
      if (!document.querySelectorAll(".product-card").length) {
        $productsCartContainer.innerHTML = `
          <h3><a href="../pages/product-listing-page.html">no hay productos en tu carrito</a></h3>
        `;
      }
      return;
    }

    if (e.target.closest(".qty-btn.increment")) {
      const qtyValueEl = card.querySelector(".qty-value");
      let qty = Number(qtyValueEl.textContent);
      const basePrice = Number(card.dataset.price);
      if (qty < maxQuantyProduct) qty++;
      qtyValueEl.textContent = qty;
      card.querySelector(".cart-price").textContent = (basePrice * qty).toFixed(2);
      updateTotalPrice();
      return;
    }

    if (e.target.closest(".qty-btn.decrement")) {
      const qtyValueEl = card.querySelector(".qty-value");
      let qty = Number(qtyValueEl.textContent);
      const basePrice = Number(card.dataset.price);
      if (qty > 1) qty--;
      qtyValueEl.textContent = qty;
      card.querySelector(".cart-price").textContent = (basePrice * qty).toFixed(2);
      updateTotalPrice();
      return;
    }
  });
}

