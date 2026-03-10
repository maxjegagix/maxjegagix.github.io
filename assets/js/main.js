const nav = document.querySelector(".nav");
const toggle = document.querySelector(".hamburger");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}
