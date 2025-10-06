const URL = "https://fakestoreapi.com/products";
const params = new URLSearchParams(window.location.search);
let item = params.get("item")

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
  setRate(product);
  setOpinion(product);
}

function setImage(product) {
  console.log(product);
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  img.height = 600;
  const container = document.getElementById("products");
  container.appendChild(img);
}
function setTitle(product) {
  const title = document.createElement("h3");
  title.textContent = product.title;
  const info = document.getElementById("title-product");
  info.appendChild(title);
  title.classList.add("title-product");
}
function setPrice(product) {
  const price = document.createElement("p");
  price.textContent = `$${product.price}`;
  const info = document.getElementById("price-product");
  info.appendChild(price);
  price.classList.add("price-product");
}
function setDescription(product) {
  const description = document.createElement("p");
  description.textContent = `${product.description}`;
  const info = document.getElementById("description-product");
  info.appendChild(description);
  info.classList.add("description-product");
}
function setRate(product) {
  const rate = document.createElement("p");
  rate.textContent = `${product.rating.rate}`;
  const rating = document.getElementById("rate-product");
  rating.appendChild(rate);
  rating.classList.add("rate-product");
}
function setOpinion(product) {
  const opinion = document.createElement("p");
  opinion.textContent = `(${product.rating.count} Reviews)`;
  const review = document.getElementById("review-product");
  review.appendChild(opinion);
  review.classList.add("review-product");
}

const buttons = document.querySelectorAll(".size-btn button");
const selectedSizeText = document.querySelector(".selected-size");
const sizeMap = {
  S: "Small",
  M: "Medium",
  L: "Large",
};
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const selectedLetter = btn.textContent;
    const selectedWord = sizeMap[selectedLetter];
    selectedSizeText.textContent = `Talle ${selectedWord}`;
  });
});
let valueCounter = 0;
const counterElement = document.getElementById("counter");
const increaseBtn = document.getElementById("more");
const decreaseBtn = document.getElementById("less");
function increase() {
  valueCounter++;
  counterElement.textContent = valueCounter;
}
function decrease() {
  if (valueCounter > 0) {
    valueCounter--;
    counterElement.textContent = valueCounter;
  }
}
increaseBtn.onclick = increase;
decreaseBtn.onclick = decrease;
