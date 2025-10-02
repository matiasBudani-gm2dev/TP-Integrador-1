let debounce;
export function wireHeaderSearch() {
    const searchInput = document.getElementById('search-input')
    if (!searchInput) return

    searchInput.addEventListener('input', e => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
        const query = e.target.value.trim();
        if (query) {
            console.log("Buscar:", query);
        }
    }, 200);
    })
    searchInput.addEventListener('keydown', e => {
        const query = e.target.value.trim();
        if (e.key === 'Enter') {
            e.preventDefault()
            window.location.href = `/pages/product-listing-page.html?search=${encodeURIComponent(query)}`;
        }
    })

}
