// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// Typewriter effect
const phrases = ["Student IT", "BSIT 3A", "Hardware & Troubleshooting", "Future IT Professional"];
const typedEl = document.getElementById("typed");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = phrases[phraseIndex];
  typedEl.textContent = deleting
    ? current.slice(0, --charIndex)
    : current.slice(0, ++charIndex);

  let delay = deleting ? 55 : 110;

  if (!deleting && charIndex === current.length) {
    delay = 1600;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 350;
  }
  setTimeout(type, delay);
}
type();

// Scroll reveal
const revealTargets = document.querySelectorAll(
  ".section-title, .about-grid, .stat, .timeline-item, .skill-card, .contact-card, .faq-item"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealTargets.forEach((el) => observer.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { threshold: 0.5 }
);
sections.forEach((s) => sectionObserver.observe(s));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ===== 3D tilt interaction (IT design) =====
const tiltEls = document.querySelectorAll(".tilt");
const MAX_TILT = 12; // degrees

tiltEls.forEach((el) => {
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;   // 0..1
    const py = (e.clientY - r.top) / r.height;   // 0..1
    el.style.setProperty("--ry", ((px - 0.5) * 2 * MAX_TILT).toFixed(2) + "deg");
    el.style.setProperty("--rx", ((0.5 - py) * 2 * MAX_TILT).toFixed(2) + "deg");
  });
  el.addEventListener("pointerleave", () => {
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  });
});

// ===== Hero scene parallax: cube follows the cursor =====
const scene = document.querySelector(".scene3d");
const cube = document.querySelector(".cube");

if (scene && cube) {
  const BASE_X = -18; // matches CSS keyframe tilt
  scene.addEventListener("pointermove", (e) => {
    const r = scene.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cube.style.animation = "none";
    cube.style.transform = `rotateX(${BASE_X - py * 50}deg) rotateY(${px * 70}deg)`;
  });
  scene.addEventListener("pointerleave", () => {
    cube.style.transform = "";
    cube.style.animation = ""; // resume cube-spin
  });
}

// ===== Floating chips react to scroll (depth parallax) =====
const chips = document.querySelectorAll(".float-chip");
if (chips.length) {
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      chips.forEach((chip, i) => {
        chip.style.translate = `0 ${y * (0.04 + i * 0.03)}px`;
      });
    },
    { passive: true }
  );
}

// ===== 3D flip skill cards: click / tap / keyboard =====
document.querySelectorAll(".skill-card").forEach((card) => {
  const flip = () => card.classList.toggle("flipped");
  card.addEventListener("click", flip);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flip();
    }
  });
});
