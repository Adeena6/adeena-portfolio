const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const phrases = ["digital experiences", "mobile applications", "AI-powered solutions", "web interfaces"];
const typedText = document.getElementById("typedText");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typePhrase() {
  if (!typedText) return;
  const phrase = phrases[phraseIndex];
  typedText.textContent = phrase.slice(0, charIndex);
  if (!deleting && charIndex < phrase.length) {
    charIndex++;
    setTimeout(typePhrase, 75);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typePhrase, 1350);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(typePhrase, 35);
  } else {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typePhrase, 250);
  }
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) typePhrase();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.getElementById("year").textContent = new Date().getFullYear();
