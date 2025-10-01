const breadcrumb = document.getElementById("breadcrumb");

// nombre distinto
const segments = window.location.pathname
  .split("/")
  .filter(Boolean);

breadcrumb.innerHTML = "";

const homeLi = document.createElement("li");
homeLi.innerHTML = `<a href="/index.html">Home</a>`;
breadcrumb.appendChild(homeLi);

// resto
segments.forEach((segment, index) => {
  if (segment === "index.html") return;

  const li = document.createElement("li");
  const isLast = index === segments.length - 1;
  const href = "/" + segments.slice(0, index + 1).join("/");

  li.innerHTML = isLast
    ? `<span class="current">${segment}</span>`
    : `<a href="${href}">${segment}</a>`;

  breadcrumb.appendChild(li);
});
