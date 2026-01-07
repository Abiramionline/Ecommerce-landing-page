// MOBILE NAV TOGGLE
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav-open");
});

// Close mobile menu when clicking a link
const navLinks = navMenu.querySelectorAll("a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("nav-open");
  });
});

// CTA FORM (demo)
const ctaForm = document.querySelector(".cta-form");
if (ctaForm) {
  ctaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for subscribing! 🎉");
    ctaForm.reset();
  });
}
