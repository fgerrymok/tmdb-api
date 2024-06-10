const marker = document.querySelector(".marker");
const sections = document.querySelectorAll("section");
const lists = document.querySelectorAll("#nav-bar a");

window.addEventListener("scroll", () => {
  let current = "";
  let scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - section.offsetHeight / 2) {
      current = section.getAttribute("id");
    }
  });

  lists.forEach((menu) => {
    menu.classList.remove("current-showing");
    if (menu.getAttribute("href").substring(1) === current) {
      menu.classList.add("current-showing");
    }
  });
});

// btn-menu
const btnMenu = document.getElementById("btn-menu");
const sectionLink = document.getElementById("section-link");
const mainPg = document.querySelector("main");

btnMenu.addEventListener("click", () => {
  sectionLink.classList.toggle("dropdown");
});

mainPg.addEventListener("click", () => {
  sectionLink.classList.remove("dropdown");
});
