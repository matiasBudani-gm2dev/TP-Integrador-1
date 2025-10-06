// main.js
import { getProducts, displayProducts, updateProductCount } from "./listing-products.js";
import { updateCartCount, updateWishlistCount, toggleCart, toggleWishlist, syncButtonsFromStorage } from "./cart-wishlist.js";
import { wireHeaderSearch } from "./search-header.js";
import { priceValidation } from "./priceValidation.js";

import {
  showSelectedFilters,
  filterByCategory,
  showAllProducts,
  showSelectedSizes,
  deleteSelected,
  filterBySize,
  filterByColor,
  filterByPrice,
  filterByDisponibility
} from "./filters.js";

let cachedProducts = [];

async function init() {
  // 1) Productos
  cachedProducts = await getProducts();
  displayProducts(cachedProducts);
  updateProductCount(cachedProducts.length);
  showSelectedFilters(cachedProducts);

  // 2) Botones según storage
  syncButtonsFromStorage();

  // 3) Contadores header
  updateCartCount();
  updateWishlistCount();

  // 4) Delegación eventos productos
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

  // 5) Buscador
  wireHeaderSearch?.();
  filterByPrice()

  // 6) Búsqueda dinámica
  document.addEventListener("header:search", (ev) => {
    const q = ev.detail.q.toLowerCase();
    const filtered = cachedProducts.filter((p) =>
      `${p.title} ${p.category ?? ""}`.toLowerCase().includes(q)
    );
    displayProducts(filtered);
    updateProductCount(filtered.length);
    syncButtonsFromStorage();
  });

  document.addEventListener("price:change", ({ detail: { min, max } }) => {
  const out = cachedProducts.filter(p => {
    const okMin = min == null || p.price >= min;
    const okMax = max == null || p.price <= max;
    return okMin && okMax;
  });
  displayProducts(out);
  updateProductCount(out.length);
  syncButtonsFromStorage();
});

  // 7) ✅ Validación de precio
  priceValidation("#minPrice, #maxPrice", {
    pair: { a: "#minPrice", b: "#maxPrice", message: "El mínimo no puede ser mayor que el máximo." }
  });
}

// Exponer si tu HTML usa onclick=...
window.filterByCategory = filterByCategory;
window.filterBySize = filterBySize
window.filterByColor = filterByColor
window.filterByDisponibility = filterByDisponibility
window.showAllProducts = showAllProducts;
window.showSelectedSizes = showSelectedSizes;
window.deleteSelected = deleteSelected;

// init al cargar DOM
document.addEventListener("DOMContentLoaded", init);
