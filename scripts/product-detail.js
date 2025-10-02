const URL = "https://fakestoreapi.com/products";
let item = 1;

fetch(`${URL}/${item}`)
  .then((res) => res.json())
  .then((product) => {
    setData(product);
  });

function setData(product) {
  setImage(product);
  setTitle(product);
  setPrice(product);
  setDescription(product);
}

function setImage(product) {
  console.log(product);
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  img.width = 200;
  const container = document.getElementById("products");
  container.appendChild(img);
}
function setTitle(product) {
  const title = document.createElement("h3");
  title.textContent = product.title;
  const info = document.getElementById("title-product");
  info.appendChild(title);
}
function setPrice(product) {
  const price = document.createElement("p");
  price.textContent = `$${product.price}`;
  const info = document.getElementById("price-product");
  info.appendChild(price);
}
function setDescription(product) {}

const buttons = document.querySelectorAll(".size-btn button");
const selectedSizeText = document.querySelector(".selected-size")
const sizeMap = {
  S: "Small",
  M: "Medium",
  L: "Large"
}
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const selectedLetter = btn.textContent;
    const selectedWord = sizeMap[selectedLetter];
  const selected = btn.textContent;
  selectedSizeText.textContent = `Talle ${selectedWord}`
  });
});
let valueCounter = 0;
const counterElement = document.getElementById("counter")
const increaseBtn = document.getElementById("more")
const decreaseBtn = document.getElementById("less")
function increase(){
  valueCounter++;
  counterElement.textContent = valueCounter
}
function decrease() {
  if (valueCounter > 0) { 
    valueCounter--;
    counterElement.textContent = valueCounter;
  }
}
increaseBtn.onclick = increase;
decreaseBtn.onclick = decrease;
