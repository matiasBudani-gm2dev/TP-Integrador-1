// filters.js
import { displayProducts, updateProductCount } from "./listing-products.js";
import { syncButtonsFromStorage } from "./cart-wishlist.js";


document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', function() {
    filterBySize(this.id.charAt(0));
  });
});

// Estado propio del módulo de filtros
let products = [];
let countSelected = 0;
let selectedSizes = [];

// Permite inyectar los productos desde el init del archivo principal
export function setProducts(list) {
  products = Array.isArray(list) ? list : [];
}

// ✅ Mostrar todos los productos
export function showAllProducts() {
  displayProducts(products);
  updateProductCount(products.length);
  syncButtonsFromStorage();
}

// ✅ Filtro por categoría
export function filterByCategory(category) {
  const filtered = products.filter((prod) => prod.category === category);
  displayProducts(filtered);
  updateProductCount(filtered.length);
  syncButtonsFromStorage();
}

export function filterBySize(idSize) {
  const size = document.getElementById(idSize + "-size");
  const img = size?.querySelector("img");
  if (img) {
    if (img.getAttribute("src") === "/assets//unchecked box.svg") {
      img.setAttribute("src", "/assets//checked box.svg");
      countSelected++;
    } else {
      img.setAttribute("src", "/assets//unchecked box.svg");
      countSelected--;
    }
  }

  const index = selectedSizes.indexOf(idSize);
  if (index === -1) {
    selectedSizes.push(idSize);
  } else {
    selectedSizes.splice(index, 1);
  }

  const filtered = products.filter((prod) => prod.category?.includes("clothing"));
  displayProducts(filtered);
  updateProductCount(filtered.length);
  syncButtonsFromStorage();
  showSelected();
}

export function deleteSelected() {
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach((button) => {
    const buttonImage = button.querySelector("img");
    if (buttonImage) buttonImage.setAttribute("src", "/assets//unchecked box.svg");
  });
  countSelected = 0;
  selectedSizes = [];
  showSelected();
}

export function showSelected() {
  const existingSelected = document.querySelector(".selected");
  const selectedFilters = document.querySelector(".selected-filters");

  const updateSizes = document.querySelector(".selected-sizes");
  if (updateSizes) updateSizes.remove();

  if (countSelected !== 0) {
    let selected = existingSelected;

    if (!selected) {
      selected = document.createElement("div");
      selected.className = "selected";
      selectedFilters?.appendChild(selected);
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

      selected?.parentElement?.appendChild(selectedSizesContainer);
    }
  } else {
    // Sin seleccionados: limpiar UI y mostrar todo
    if (existingSelected) existingSelected.remove();
    selectedSizes = [];
    showAllProducts();
  }
}

// ✅ (Opcional) Exponer estado si te sirve depurar
export function _debugSelected() {
  return { countSelected, selectedSizes: [...selectedSizes], totalProducts: products.length };
}
