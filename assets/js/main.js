const nav = document.querySelector(".nav");
const toggle = document.querySelector(".hamburger");
const interactive = document.querySelector(".hero-interactive");
const glow = document.querySelector(".hero-glow");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

if (interactive && glow) {
  const reset = () => {
    interactive.style.transform = "";
    glow.style.left = "50%";
    glow.style.top = "50%";
    interactive.classList.remove("is-active");
  };

  interactive.addEventListener("pointermove", (event) => {
    const rect = interactive.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;

    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
    interactive.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    interactive.classList.add("is-active");
  });

  interactive.addEventListener("pointerleave", reset);
  interactive.addEventListener("pointerdown", reset);
}
