import { getProducts, displayProducts, updateProductCount } from "./listing-products.js";
import { updateCartCount, updateWishlistCount, toggleCart, toggleWishlist, syncButtonsFromStorage } from "./cart-wishlist.js";
import { wireHeaderSearch } from "./search-header.js";

// 🧠 Hacer productos accesibles desde otras funciones
let cachedProducts = [];
let countSelected = 0;
let selectedSizes = [];

async function init() {
  // 1. Traer productos
  cachedProducts = await getProducts();
  displayProducts(cachedProducts);
  updateProductCount(cachedProducts.length);

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

  // 6. Listener para búsqueda dinámica
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

// ✅ Mostrar todos los productos
function showAllProducts() {
  displayProducts(cachedProducts);
  updateProductCount(cachedProducts.length);
  syncButtonsFromStorage();
}

// ✅ Filtro por categoría
function filterByCategory(category) {
  const filtered = cachedProducts.filter((prod) => prod.category === category);
  displayProducts(filtered);
  updateProductCount(filtered.length);
  syncButtonsFromStorage();
}

function filterBySize(idSize) {

  const size = document.getElementById(idSize + "-size")
    const img = size.querySelector("img")
    if(img.getAttribute('src') === "/assets//unchecked box.svg"){
        img.setAttribute('src',"/assets//checked box.svg")
        countSelected++
    }else{
        img.setAttribute('src',"/assets//unchecked box.svg")
        countSelected--
    }

  const index = selectedSizes.indexOf(idSize);

  if (index === -1) {
    selectedSizes.push(idSize); 
  } else {
    selectedSizes.splice(index, 1);
  }

  const filtered = cachedProducts.filter((prod) =>
    prod.category.includes("clothing")
  );

  displayProducts(filtered);
  updateProductCount(filtered.length);
  syncButtonsFromStorage()
  showSelected()
}

function deleteSelected(){
    const buttons = document.querySelectorAll(".filters button")
    buttons.forEach((button)=>{
        const buttonImage = button.querySelector("img")
        buttonImage.setAttribute('src',"/assets//unchecked box.svg")
    })
    countSelected = 0
    selectedSizes = [];
    showSelected()
}


function showSelected() {
  const existingSelected = document.querySelector(".selected");
  const selectedFilters = document.querySelector(".selected-filters");

  const updateSizes = document.querySelector(".selected-sizes");
  if (updateSizes) updateSizes.remove();

  if (countSelected !== 0) {
    let selected = existingSelected;

    if (!selected) {
      selected = document.createElement("div");
      selected.className = "selected";
      selectedFilters.appendChild(selected);
    }

    selected.innerHTML = `
      <p class="count-selected">${countSelected} selected</p>
      <button onclick="deleteSelected()" class="delete-selected">Borrar todo</button>
    `;

    if (selectedSizes.length !== 0) {
      const selectedSizesContainer = document.createElement("div");
      selectedSizesContainer.className = "selected-sizes";

      selectedSizes.forEach((size) => {
        const sizeElement = document.createElement("div");
        sizeElement.className = "selected-size-item";

        sizeElement.innerHTML = `
        <div class="show-selected-sizes">
          <p>${size}</p>
          <img src="/assets/Dawn icons.svg" id="${size}" alt="Eliminar" />
        </div>
        `;

        selectedSizesContainer.appendChild(sizeElement);
      });

      selectedFilters.appendChild(selectedSizesContainer);
    }

  } else if (countSelected === 0 && existingSelected) {
    existingSelected.remove();
    selectedSizes = [];
    init();
  }
}




// ✅ Exponer funciones globales
window.filterByCategory = filterByCategory
window.filterBySize = filterBySize
window.showAllProducts = showAllProducts
window.showSelected = showSelected
window.deleteSelected = deleteSelected

document.addEventListener("DOMContentLoaded", init)
