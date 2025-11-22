// navigation.js – Accessible Mobile Navigation Toggle

const menuButton = document.querySelector("#menu");
const navMenu = document.querySelector("#navMenu");

// Only run if both elements exist
if (menuButton && navMenu) {
  // Ensure ARIA is correct on load
  menuButton.setAttribute("aria-expanded", "false");

  menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("show");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close menu when any link is clicked
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  // Close if clicking outside nav + menu button
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      if (navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
        menuButton.setAttribute("aria-expanded", "false");
      }
    }
  });
}

