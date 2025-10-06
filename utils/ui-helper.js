export function updateCount(count, selector) {
    const element = document.querySelector(selector);
    if (element) element.textContent = count;
}
