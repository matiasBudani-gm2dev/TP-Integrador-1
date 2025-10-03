import { getProducts, displayProducts, updateProductCount } from "./listing-products.js";
import { updateCartCount, updateWishlistCount, toggleCart, toggleWishlist, syncButtonsFromStorage } from "./cart-wishlist.js";
import { wireHeaderSearch } from "./search-header.js";

async function init() {
  // 1. Traer productos
  const products = await getProducts();
  
  const params = new URLSearchParams(window.location.search);
  const q = (params.get("search") || "").toLowerCase().trim();

  let list = products;
  if (q) {
    list = products.filter(p =>
      `${p.title} ${p.category ?? ""}`.toLowerCase().includes(q)
    );
  }

  displayProducts(list);
  updateProductCount(list.length);
  syncButtonsFromStorage();

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

  // 6. Listener para búsqueda dinámica
  document.addEventListener("header:search", (ev) => {
    const q = ev.detail.q.toLowerCase();
    const filtered = products.filter((p) =>
      `${p.title} ${p.category ?? ""}`.toLowerCase().includes(q)
    );
    displayProducts(filtered);
    updateProductCount(filtered.length);
    syncButtonsFromStorage();
  });
}

document.addEventListener("DOMContentLoaded", init);
