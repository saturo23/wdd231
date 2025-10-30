const menuButton = document.querySelector('#menu');
const navMenu = document.querySelector('#navMenu');

menuButton.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});
