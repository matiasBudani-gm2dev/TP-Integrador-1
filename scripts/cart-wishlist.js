import { storageService } from "../utils/localStorage.js";

const cartCount = document.getElementById('cart-count');
const wishlistCount = document.getElementById('wishlist-count');

export function updateCartCount() {
  if (cartCount) cartCount.textContent = storageService.getCartCount();
}

export function updateWishlistCount() {
  if (wishlistCount) wishlistCount.textContent = storageService.getWishlistCount();
}

export function syncButtonsFromStorage() {
  const cart = new Set(storageService.getCart().map(String));
  const wish = new Set(storageService.getWishlist().map(String));

  document.querySelectorAll('.product-card').forEach(card => {
    const id = String(card.dataset.productId);
    const cartBtn = card.querySelector('.add-to-cart-btn');
    const wishBtn = card.querySelector('.add-to-wishlist-btn');

    if (cartBtn) cartBtn.classList.toggle('btn-selected', cart.has(id));
    if (wishBtn) wishBtn.classList.toggle('btn-selected', wish.has(id));
  });

  updateCartCount();
  updateWishlistCount();
}

export function toggleCart(id, button) {
  id = Number(id);

  if (storageService.isInCart(id)) {
    storageService.removeFromCart(id);
    button?.classList.remove('btn-selected');
  } else {
    storageService.addToCart(id);
    button?.classList.add('btn-selected');
  }

  updateCartCount();
}

export function toggleWishlist(id, button) {
  if (storageService.isInWishlist(id)) {
    storageService.removeFromWishlist(id);
    button.classList.remove('btn-selected');
  } else {
    storageService.addToWishlist(id);
    button.classList.add('btn-selected');
  }

  updateWishlistCount();
}

export function removeFromCart(id) {
  storageService.removeFromCart(id);
  updateCartCount();
}
