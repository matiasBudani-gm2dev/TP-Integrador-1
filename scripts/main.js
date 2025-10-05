import { getProducts, displayProducts, updateProductCount } from "./listing-products.js";
import { updateCartCount, updateWishlistCount, toggleCart, toggleWishlist, syncButtonsFromStorage } from "./cart-wishlist.js";
import { wireHeaderSearch } from "./search-header.js";

// ✅ importar desde filters.js
import {
  setProducts,
  filterByCategory,
  filterBySize,
  showAllProducts,
  showSelected,
  deleteSelected
} from "./filters.js";

// 🧠 Estado local solo si lo necesitás acá (p.ej. para buscador)
let cachedProducts = [];

async function init() {
  // 1. Traer productos
  cachedProducts = await getProducts();
  displayProducts(cachedProducts);
  updateProductCount(cachedProducts.length);

  // 👉 pasar productos al módulo de filtros
  setProducts(cachedProducts);

  // 2. Marcar botones según localStorage
  syncButtonsFromStorage();

  // 3. Actualizar contadores en header
  updateCartCount();
  updateWishlistCount();

  // 4. Delegación de eventos en productos
  const container = document.getElementById("products-container");
  if (container) {
    container.addEventListener("click", (e) => {
      const card = e.target.closest(".product-card");
      if (!card) return;
      const id = card.dataset.productId;

      const cartBtn = e.target.closest(".add-to-cart-btn");
      if (cartBtn) toggleCart(id, cartBtn);

      const wishBtn = e.target.closest(".add-to-wishlist-btn");
      if (wishBtn) toggleWishlist(id, wishBtn);
    });
  }

  // 5. Buscador global
  wireHeaderSearch?.();

  // 6. Listener para búsqueda dinámica (no cambia)
  document.addEventListener("header:search", (ev) => {
    const q = ev.detail.q.toLowerCase();
    const filtered = cachedProducts.filter((p) =>
      `${p.title} ${p.category ?? ""}`.toLowerCase().includes(q)
    );
    displayProducts(filtered);
    updateProductCount(filtered.length);
    syncButtonsFromStorage();
  });
}

// ✅ Exponer funciones globales (si las usa tu HTML con onclick=... )
window.filterByCategory = filterByCategory;
window.filterBySize = filterBySize;
window.showAllProducts = showAllProducts;
window.showSelected = showSelected;
window.deleteSelected = deleteSelected;

document.addEventListener("DOMContentLoaded", init);
