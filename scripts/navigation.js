// navigation.js – Accessible Mobile Navigation Toggle

const menuButton = document.querySelector("#menu");
const navMenu = document.querySelector("#navMenu");

if (menuButton && navMenu) {
  // Ensure ARIA is correct on load
  menuButton.setAttribute("aria-expanded", "false");

  menuButton.addEventListener("click", (event) => {
    event.stopPropagation(); // prevent triggering document click
    const isOpen = navMenu.classList.toggle("show");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close menu when any link is clicked
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu if clicking outside nav and button
  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !menuButton.contains(event.target)) {
      if (navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
        menuButton.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Optional: close menu on ESC key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("show")) {
      navMenu.classList.remove("show");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}
