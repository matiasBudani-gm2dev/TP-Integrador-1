const breadcrumb = document.getElementById("breadcrumb");

const path = window.location.pathname
  .split("/")
  .filter(Boolean);

// construir items
path.forEach((segment, index) => {
  const li = document.createElement("li");
  const isLast = index === path.length - 1;
  const href = "/" + path.slice(0, index + 1).join("/");

  if (isLast) {
    li.innerHTML = `<span class="current">${segment}</span>`;
  } else {
    li.innerHTML = `<a href="${href}">${segment}</a> <span>›</span>`;
  }

  breadcrumb.appendChild(li);
});
