const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll(".dot"));
const slidesTrack = document.querySelector(".slides");
let observer;

if (menuToggle && header) {
  menuToggle.addEventListener("click", () => {
    header.classList.toggle("is-open");
  });
}

const setActiveSlide = (targetId) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${targetId}`);
  });

  dots.forEach((dot) => {
    dot.classList.toggle("is-active", dot.getAttribute("href") === `#${targetId}`);
  });

  slides.forEach((slide) => {
    slide.classList.toggle("is-active", slide.id === targetId);
  });
};

const goToSlide = (targetId) => {
  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

  target.scrollIntoView({ behavior, inline: "start", block: "start" });
  setActiveSlide(targetId);
};

[...navLinks, ...dots].forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) {
      return;
    }

    const targetId = href.slice(1);
    event.preventDefault();
    goToSlide(targetId);

    if (header) {
      header.classList.remove("is-open");
    }

    history.replaceState(null, "", href);
  });
});

const initObserver = () => {
  if (!("IntersectionObserver" in window)) {
    return;
  }

  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) {
        return;
      }

      setActiveSlide(visibleEntry.target.id);
    },
    {
      threshold: 0.55,
      root: window.innerWidth <= 720 ? null : slidesTrack,
    }
  );

  slides.forEach((slide) => observer.observe(slide));
};

initObserver();

window.addEventListener("resize", () => {
  initObserver();
  const activeSlide = document.querySelector(".slide.is-active");
  if (activeSlide) {
    setActiveSlide(activeSlide.id);
  }
});

window.addEventListener("load", () => {
  const hash = window.location.hash ? window.location.hash.slice(1) : slides[0]?.id;
  if (hash) {
    setActiveSlide(hash);
  }
});
