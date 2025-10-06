const breadcrumb = document.getElementById("breadcrumb");

const segments = window.location.pathname
  .split("/")
  .filter(Boolean);

const segmentMap = {
  "product-listing-page.html": "Productos"
};

breadcrumb.innerHTML = "";

const homeLi = document.createElement("li");
homeLi.innerHTML = `
  <a href="/index.html">Home</a>`;
breadcrumb.appendChild(homeLi);

segments.forEach((segment, index) => {
  if (segment === "index.html" || segment === 'pages') return;

  const li = document.createElement("li");
  const isLast = index === segments.length - 1;
  const href = "/" + segments.slice(0, index + 1).join("/");

  const name = segmentMap[segment] || segment.replace(/[-_]/g, " ");

  li.innerHTML = isLast
    ? `<span class="current">${name}</span>`
    : `<a href="${href}">${name}</a>`;

  breadcrumb.appendChild(li);
});

