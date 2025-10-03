if (!localStorage.getItem('cart')) localStorage.setItem('cart', '[]');
if (!localStorage.getItem('wishlist')) localStorage.setItem('wishlist', '[]');

const cartCount = document.getElementById('cart-count');
const wishlistCount = document.getElementById('wishlist-count');

export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cartCount) cartCount.textContent = cart.length;
}

export function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  if (wishlistCount) wishlistCount.textContent = wishlist.length;
}

export function syncButtonsFromStorage() {
  const cart = new Set((JSON.parse(localStorage.getItem('cart') || '[]')).map(String));
  const wish = new Set((JSON.parse(localStorage.getItem('wishlist') || '[]')).map(String));

  document.querySelectorAll('.product-card').forEach(card => {
    const id = String(card.dataset.productId);
    card.querySelector('.add-to-cart-btn')?.classList.toggle('btn-selected', cart.has(id));
    card.querySelector('.add-to-wishlist-btn')?.classList.toggle('btn-selected', wish.has(id));
  });

  updateCartCount();
  updateWishlistCount();
}

export function toggleCart(id, button) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(id)) {
        cart.push(id);
        button.classList.add('btn-selected')
    } else {
        cart = cart.filter(item => item !== id);
        button.classList.remove('btn-selected');
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

export function toggleWishlist(id, button) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.includes(id)) {
        wishlist.push(id);
        button.classList.add('btn-selected')
    } else {
        wishlist = wishlist.filter(item => item !== id)
        button.classList.remove('btn-selected')
        
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}
