export function checkOrderByInput(event) {
  // No uses preventDefault para que el checkbox cambie su estado normalmente

  if (!window.matchMedia("(max-width: 768px)").matches) {
    // Si es más grande, no hacemos nada
    return;
  }

  const checkbox = event.target;
  const orderByModal = document.querySelector('.order-by-container');

  if (!orderByModal) return;

  if (checkbox.checked) {
    orderByModal.style.transform = "translateX(0)";
  } else {
    orderByModal.style.transform = "translateX(100%)";
  }

  console.log("Estado actual:", checkbox.checked);
}
