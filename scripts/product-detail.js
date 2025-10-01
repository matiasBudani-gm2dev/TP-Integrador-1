const URL = "https://fakestoreapi.com/products";

fetch("https://fakestoreapi.com/products/1")
  .then((res) => res.json())
  .then((product) => {
    console.log(product); // Aquí ves todos los datos
    console.log("Imagen:", product.image); // URL de la imagen

    // Crear un <img> y agregarlo al body
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.width = 200;
    document.body.appendChild(img);
  });
const buttons = document.querySelectorAll(".size-btn button");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
document.querySelector(".Mbtn").classList.add("active");
