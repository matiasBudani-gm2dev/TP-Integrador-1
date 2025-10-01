const URL = "https://fakestoreapi.com/products";
let item = 1;

fetch("https://fakestoreapi.com/products/1")
  .then((res) => res.json())
  .then((product) => {
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.width = 200;

    // Buscar el div con id="products"
    const container = document.getElementById("products");
    container.appendChild(img); // 👈 mete la imagen dentro del div

    const title = document.createElement("h3");
    title.textContent = product.title;
    // Precio
    const price = document.createElement("p");
    price.textContent = `$${product.price}`;
    const info = document.getElementById("info-product");
    info.appendChild(title);
    info.appendChild(price);
    console.log(info);
  });

const buttons = document.querySelectorAll(".size-btn button");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
document.querySelector(".Mbtn").classList.add("active");
