export function wireHeaderSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  let debounceTimer;

  const handleQuery = (query) => {
    document.dispatchEvent(new CustomEvent('header:search', { detail: { q: query } }));
  };

  input.addEventListener('input', e => {
    const query = e.target.value.trim() || '';
    clearTimeout(debounceTimer);
    clearTimeout(idleTimer);

    debounceTimer = setTimeout(() => handleQuery(query), 300);

      const url = new URL(window.location.href);
      if (query) {
        url.searchParams.set("search", query);
      } else {
        url.searchParams.delete("search");
      }
      history.replaceState({}, "", url);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = e.target.value.trim();
      if (query) {
        window.location.href =
          `/pages/product-listing-page.html?search=${encodeURIComponent(query)}`;
      }
    } else if (e.key === 'Escape') {
      input.value = '';
      handleQuery('');
    }
  });
}
export function wireHeaderSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  let debounceTimer;
  let idleTimer;

  const handleQuery = (query) => {
    document.dispatchEvent(new CustomEvent('header:search', { detail: { q: query } }));
  };

  input.addEventListener('input', e => {
    const query = e.target.value.trim() || '';
    clearTimeout(debounceTimer);
    clearTimeout(idleTimer);

    debounceTimer = setTimeout(() => handleQuery(query), 300);

    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set("search", query);
    } else {
      url.searchParams.delete("search");
    }
    history.replaceState({}, "", url);

  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = e.target.value.trim();
      if (query) {
        window.location.href =
          `/pages/product-listing-page.html?search=${encodeURIComponent(query)}`;
      }
    } else if (e.key === 'Escape') {
      input.value = '';
      handleQuery('');
    }
  });
}
