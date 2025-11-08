// date.js - Update footer year and last modified date
const yearElement = document.getElementById('currentyear');
const lastModifiedElement = document.getElementById('lastModified');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (lastModifiedElement) {
  lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}
