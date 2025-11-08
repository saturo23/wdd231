// navigation.js - Menu toggle for small screens
const menuButton = document.querySelector('#menu');
const navMenu = document.querySelector('#navMenu');

if (menuButton && navMenu) {
  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');

    // Optional: toggle ARIA attribute for accessibility
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !expanded);
  });
}
