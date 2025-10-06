const image = document.getElementById("dynamic-image");
const title = document.getElementById("title");
const description = document.getElementById("description");
const switchOffices = document.getElementById("switch-offices");
const switchTeam = document.getElementById("switch-team");

const sections = {
  offices: {
    image: "assets/our-offices.png",
    title: "NUESTRAS OFICINAS",
    description:
      "Nuestros espacios están pensados como un entorno donde podés codear, debatir y romper producción sin juicio. Acá se respira código, pero también se charla de juegos, memes y el próximo hackathon.",
  },
  team: {
    image: "assets/our-team.jpg",
    title: "NUESTRO EQUIPO",
    description:
      "Somos un grupo de developers, diseñadores y creativos que viven el código como una forma de expresión. Nos une la pasión por construir, aprender y compartir lo que sabemos con la comunidad.",
  },
};

[image, title, description].forEach((el) => el.classList.add("fade", "show"));

function updateContent(section) {
  const data = sections[section];

  [image, title, description].forEach((el) => el.classList.remove("show"));

  setTimeout(() => {
    image.src = data.image;
    title.textContent = data.title;
    description.textContent = data.description;

    [image, title, description].forEach((el) => el.classList.add("show"));
  }, 400);

  switchOffices.classList.toggle("active", section === "offices");
  switchTeam.classList.toggle("active", section === "team");
}

switchOffices.addEventListener("click", () => updateContent("offices"));
switchTeam.addEventListener("click", () => updateContent("team"));
