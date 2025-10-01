document.querySelectorAll(".selected-page")
  .forEach(el => el.classList.remove("selected-page"));

const path = window.location.pathname;

if (path.includes("index") || path === "/") {
  document.querySelector(".page-home")?.classList.add("selected-page");
} else if (path.includes("productos")) {
  document.querySelector(".page-productos")?.classList.add("selected-page");
}
