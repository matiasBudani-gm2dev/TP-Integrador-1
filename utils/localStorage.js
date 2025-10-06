class StorageService {
    constructor() {
        if (!localStorage.getItem('cart')) localStorage.setItem('cart', '[]');
        if (!localStorage.getItem('wishlist')) localStorage.setItem('wishlist', '[]');
        if (!localStorage.getItem('products')) localStorage.setItem('products', '[]');
    }

    get(key) {
        try {
            return JSON.parse(localStorage.getItem(key) || '[]');
        } catch (error) {
            return [];
        }
    }

    set(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            return false;
        }
    }

    // CARRITO
    getCart() {
        return this.get('cart');
    }

    setCart(cart) {
        return this.set('cart', cart);
    }

    addToCart(productId) {
        const cart = this.getCart();
        if (!cart.includes(productId)) {
            cart.unshift(productId);
            return this.setCart(cart);
        }
        return false;
    }

    removeFromCart(productId) {
        const cart = this.getCart();
        const filteredCart = cart.filter(id => id !== productId);
        return this.setCart(filteredCart);
    }

    getCartCount() {
        return this.getCart().length;
    }

    isInCart(productId) {
        return this.getCart().includes(productId);
    }

    getWishlist() {
        return this.get('wishlist');
    }

    setWishlist(wishlist) {
        return this.set('wishlist', wishlist);
    }

    addToWishlist(productId) {
        const wishlist = this.getWishlist();
        if (!wishlist.includes(productId)) {
            wishlist.unshift(productId);
            return this.setWishlist(wishlist);
        }
        return false;
    }

    removeFromWishlist(productId) {
        const wishlist = this.getWishlist();
        const filteredWishlist = wishlist.filter(id => id !== productId);
        return this.setWishlist(filteredWishlist);
    }

    getWishlistCount() {
        return this.getWishlist().length;
    }

    isInWishlist(productId) {
        return this.getWishlist().includes(productId);
    }

    setProducts(products) {
        return this.set('products', products);
    }

    getProducts() {
        return this.get('products');
    }

}

export const storageService = new StorageService();

export const {
    getCart,
    setCart,
    addToCart,
    removeFromCart,
    getCartCount,
    isInCart,
    getWishlist,
    setWishlist,
    addToWishlist,
    removeFromWishlist,
    getWishlistCount,
    isInWishlist,
    setProducts,
    getProducts
} = storageService;