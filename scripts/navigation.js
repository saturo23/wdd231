// navigation.js - Menu toggle for small screens
const menuButton = document.querySelector('#menu');
const navMenu = document.querySelector('#navMenu');

if (menuButton && navMenu) {
  menuButton.addEventListener('click', () => {
    // Toggle the menu visibility
    navMenu.classList.toggle('show');

    // Update ARIA attribute for screen readers
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !expanded);
  });

  // Optional: close menu when clicking a link (mobile UX)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        menuButton.setAttribute('aria-expanded', false);
      }
    });
  });
}
