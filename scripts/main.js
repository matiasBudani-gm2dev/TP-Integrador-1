import { fetchProducts } from "../api/products.js";
import { displayProducts } from "./listing-products.js";
import { updateCartCount, updateWishlistCount, toggleCart, toggleWishlist, syncButtonsFromStorage } from "./cart-wishlist.js";
import { wireHeaderSearch } from "./search-header.js";
import { storageService } from "../utils/localStorage.js";
import { updateCount } from "../utils/ui-helper.js";

async function init() {
  // 1. Traer productos
  let products = [];
  try {
    products = await fetchProducts();
    storageService.setProducts(products);
  } catch (error) {
    console.error(error)
    displayProducts([]);
    updateCount(0, ".products-count");
    return;
  }

  // 2. Verificar filtros
  const params = new URLSearchParams(window.location.search);
  const q = (params.get("search") || "").toLowerCase().trim();

  let list = products;
  if (q) {
    list = products.filter(p =>
      `${p.title} ${p.category ?? ""}`.toLowerCase().includes(q)
    );
  }

  // 3. Renderizar productos
  displayProducts(list);
  syncButtonsFromStorage();
  updateCartCount();
  updateWishlistCount();
  updateCount(list.length, ".product-count");

  // 4. Delegación de eventos en productos
  const container = document.getElementById("products-container");
  if (container) {
    container.addEventListener("click", (e) => {
      const card = e.target.closest(".product-card");
      if (!card) return;
      const id = Number(card.dataset.productId);

      const cartBtn = e.target.closest(".add-to-cart-btn");
      if (cartBtn) toggleCart(id, cartBtn);

      const wishBtn = e.target.closest(".add-to-wishlist-btn");
      if (wishBtn) toggleWishlist(id, wishBtn);
    });
  }

  // 5. Buscador global
  wireHeaderSearch?.();

  // 6. Listener para búsqueda dinámica
  document.addEventListener("header:search", (ev) => {
    const q = (ev.detail?.q || "").toLowerCase();
    const filtered = products.filter((p) =>
      `${p.title} ${p.category ?? ""}`.toLowerCase().includes(q)
    );
    displayProducts(filtered);
    updateCount(filtered.length, '.product-count');
    syncButtonsFromStorage();
  });
}

document.addEventListener("DOMContentLoaded", init);
