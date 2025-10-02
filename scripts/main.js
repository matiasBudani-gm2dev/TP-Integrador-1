import { getProducts, displayProducts, updateProductCount } from "./listing-products.js";
import { updateCartCount, updateWishlistCount, toggleCart, toggleWishlist , syncButtonsFromStorage} from "./cart-wishlist.js";

async function init() {
  const products = await getProducts();
  displayProducts(products);
    updateProductCount(products.length);
    
     syncButtonsFromStorage();

  updateCartCount();
  updateWishlistCount();

  const container = document.getElementById('products-container');
  if (container) {
    container.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;
        const id = card.dataset.productId;
        
        if (e.target.closest('.add-to-cart-btn')) {
            const button = e.target.closest('.add-to-cart-btn');
            toggleCart(id, button);
        }
        if (e.target.closest('.add-to-wishlist-btn')) {
            const button = e.target.closest('.add-to-wishlist-btn');
            
            toggleWishlist(id, button);
        }
  });
        
        
  }
}

document.addEventListener("DOMContentLoaded", init);
