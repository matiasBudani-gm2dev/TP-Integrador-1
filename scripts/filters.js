// filters.js
import { displayProducts, updateProductCount } from "./listing-products.js"
import { syncButtonsFromStorage } from "./cart-wishlist.js"

/* ========= Estado ========= */
let products = []
let activeCategory = null
let minPrice = null
let maxPrice = null

const selectedSizes = new Set()   // p.ej. "S", "M", "L"
const selectedColors = new Set()  // p.ej. "red", "black"
const selectedDisponibility = new Set() 

export function showSelectedFilters(list) {
  products = Array.isArray(list) ? list : []
  products.forEach((prod)=>{
    if(prod.category.includes("clothing")){

  
      prod.sizes = []

      Math.random() > 0.25 ? prod.sizes.push("L") : null
      Math.random() > 0.5 ? prod.sizes.push("M"): null
      Math.random() > 0.75 ? prod.sizes.push("S"): null
    }


    prod.colors = []
    
    Math.random() > 0.25 ? prod.colors.push("Blanca") : null
    Math.random() > 0.5 ? prod.colors.push("Negra") : null
    Math.random() > 0.75 ? prod.colors.push("Personalizada") : null
    
    const colorsTarget = ["Blanca", "Negra", "Personalizada"]

    if (colorsTarget.every(target => prod.colors.includes(target))) {
      prod.colors.push("Todos")
    }

    prod.disponibility = []

    Math.random() > 0.5 ? prod.disponibility.push("Inmediata") : null

  })

  applyFilters()
}



function updateCountSelected() {
  return selectedSizes.size + selectedColors.size + selectedDisponibility.size
}

/* Combina todos los filtros activos */
function applyFilters() {
  const out = products.filter((p) => {

    const okCategory = !activeCategory || p.category === activeCategory

    const okMinPrice = minPrice == null || p.price >= minPrice
    const okMaxPrice = maxPrice == null || p.price <= maxPrice

    const okDisponibility = 
      selectedDisponibility.size === 0 ||
      (Array.isArray(p.disponibility) &&
      p.disponibility.some((disponibility) => selectedDisponibility.has(disponibility)))

    const okSize =
      selectedSizes.size === 0 ||
      (Array.isArray(p.sizes) &&
        p.sizes.some((size) => selectedSizes.has(size)))

    const okColor =
      selectedColors.size === 0 ||
      (Array.isArray(p.colors) &&
        p.colors.some((color) => selectedColors.has(color)))

    return okCategory && okMinPrice && okMaxPrice && okSize && okColor && okDisponibility
  })

  displayProducts(out)
  updateProductCount(out.length)
  syncButtonsFromStorage()
}

function toggleButtonImageById(elId) {
  const btn = document.getElementById(elId)
  const img = btn?.querySelector("img")
  if (!img) return

  const unchecked = "/assets//unchecked box.svg"
  const checked = "/assets//checked box.svg"
  const src = img.getAttribute("src")

  img.setAttribute("src", src === unchecked ? checked : unchecked)
}

// Mostrar todo (sin tocar estado de filtros)
export function showAllProducts() {
  displayProducts(products)
  updateProductCount(products.length)
  syncButtonsFromStorage()
}

/* Categoría */
export function filterByCategory(category) {
  activeCategory = category ?? null
  applyFilters()
}

/* Precio: wire con debounce de 300ms y escucha de rango inválido desde tu validador */
export function filterByPrice() {
  const minEl = document.getElementById("minPrice")
  const maxEl = document.getElementById("maxPrice")
  if (!minEl && !maxEl) return

  const readNum = (el) => {
    if (!el) return null
    const v = (el.value ?? "").trim()
    if (v === "") return null
    const n = Number(v.replace(/,/g, "."))
    return Number.isFinite(n) ? n : null
  }

  let t
  const onInput = () => {
    clearTimeout(t)
    t = setTimeout(() => {
      const min = readNum(minEl)
      const max = readNum(maxEl)

      document.dispatchEvent(
        new CustomEvent("price:change", { detail: { min, max } })
      )
    }, 300)
  }

  minEl?.addEventListener("input", onInput)
  maxEl?.addEventListener("input", onInput)
  
}

/* Escuchar cambios de precio globalmente */
document.addEventListener("price:change", (ev) => {
  const { min, max } = ev.detail ?? {}
  // Si tu validador muestra error cuando min > max, acá no hacemos nada extra
  minPrice = min
  maxPrice = max
  applyFilters()
})

/* Sizes */
export function filterBySize(idSize) {
  const key = idSize
  if (selectedSizes.has(key)) {
    selectedSizes.delete(key)
  } else {
    selectedSizes.add(key)
  }

  toggleButtonImageById(idSize)

  applyFilters()
  showSelectedSizes()
}

/* Colors */
export function filterByColor(idColor) {
  const key = idColor
  if (selectedColors.has(key)) {
    selectedColors.delete(key)
  } else {
    selectedColors.add(key)
  }

  // Toggle visual (asegurate que los botones de color tengan id="red", etc.)
  toggleButtonImageById(idColor)

  applyFilters()
  showSelectedSizes() 
}

export function filterByDisponibility(idDisponibility){
  const key = idDisponibility
  if(selectedDisponibility.has(key)){
    selectedDisponibility.delete(key)
  }else{
    selectedDisponibility.add(key)
  }


  toggleButtonImageById(idDisponibility)

  applyFilters()
  showSelectedSizes() 

}

export function deleteSelected() {
  selectedSizes.clear()
  selectedColors.clear()
  selectedDisponibility.clear()

  // Resetear checks visuales (tanto en sizes como en colors)
  document
    .querySelectorAll(".filter-size .filter img, .filter-color .filter img, .filter-disponibility .filter img")
    .forEach((img) => img.setAttribute("src", "/assets//unchecked box.svg"))

  showSelectedSizes()
  applyFilters()
}


export function showSelectedSizes() {
  const selectedFilters = document.querySelector(".selected-filters")
  if (!selectedFilters) return

  selectedFilters.innerHTML = ""

  const total = updateCountSelected()

  if (total === 0) return;

  const header = document.createElement("div")
  header.className = "selected"
  header.innerHTML = `
    <p class="count-selected">${total} selected</p>
    <button onclick="deleteSelected()" class="delete-selected">Borrar todo</button>
  `
  selectedFilters.appendChild(header)

  const chips = document.createElement("div")
  chips.className = "selected-sizes"

  const addChip = (label) => {
    const el = document.createElement("div")
    el.className = "selected-size-item"
    el.innerHTML = `
      <div class="show-selected">
        <p>${label}</p>
        <img src="/assets/Dawn icons.svg" alt="Eliminar" data-chip="${label}" />
      </div>
    `
    chips.appendChild(el)
  }

  [...selectedSizes].forEach((size) => addChip(size));

  [...selectedColors].forEach((color) => addChip(color));

  [...selectedDisponibility].forEach((disponibility) => addChip(disponibility));

  selectedFilters.appendChild(chips)

  chips.addEventListener("click", (chip) => {
    const img = chip.target.closest("img[data-chip]")
    if (!img) return
    const value = img.getAttribute("data-chip")

    // intentar quitar de sizes si no está, de colors
    if (selectedSizes.delete(value)) {
      // también desmarcar visualmente
      toggleButtonImageById(`${value}-size`)
    } else if (selectedColors.delete(value)) {
      toggleButtonImageById(value)
    } else if(selectedDisponibility.delete(value)){
      toggleButtonImageById(value)
    }

    showSelectedSizes()
    applyFilters()
  })
}