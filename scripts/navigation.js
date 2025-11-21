// navigation.js - Mobile menu toggle
const menuButton = document.querySelector("#menu");
const navMenu = document.querySelector("#navMenu");

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("show");
    menuButton.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when a link is clicked (better mobile UX)
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  // Optional: Close menu if user clicks outside the nav
  document.addEventListener("click", (event) => {
    const clickedInside = navMenu.contains(event.target) || menuButton.contains(event.target);

    if (!clickedInside && navMenu.classList.contains("show")) {
      navMenu.classList.remove("show");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}
