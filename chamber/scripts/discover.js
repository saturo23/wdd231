// discover.js (module)
import { discoverItems } from '../data/discoverItems.mjs';

// Utility: format days between ms
function daysBetween(ms1, ms2) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor(Math.abs(ms1 - ms2) / msPerDay);
}

// Render visit message using localStorage
function renderVisitMessage() {
  const key = 'discover_last_visit';
  const msgEl = document.getElementById('visit-message');
  if (!msgEl) return;

  const now = Date.now();
  const last = Number(localStorage.getItem(key) || 0);

  if (!last) {
    msgEl.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = daysBetween(now, last);
    if (days === 0) {
      msgEl.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
      msgEl.textContent = "You last visited 1 day ago.";
    } else {
      msgEl.textContent = `You last visited ${days} days ago.`;
    }
  }

  // update stored last visit (store current time)
  localStorage.setItem(key, String(now));
}

// Build cards and insert into DOM
function buildCards(items) {
  const grid = document.getElementById('discover-grid');
  if (!grid) return;

  grid.innerHTML = ''; // clear

  items.forEach(item => {
    const article = document.createElement('article');
    article.className = 'discover-card';
    article.setAttribute('tabindex', '0'); // keyboard focusable

    article.innerHTML = `
      <figure>
        <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy">
      </figure>
      <div class="card-body">
        <h2>${item.title}</h2>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <div class="card-actions">
          <a class="btn-learn" href="#" data-id="${item.id}">Learn more</a>
        </div>
      </div>
    `;

    grid.appendChild(article);
  });
}

// Optional: very simple "learn more" modal using alert (no external modal required)
// But we can make accessible inline dialog — for simplicity we'll use a small modal element per item.
function initLearnMore(items) {
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-learn');
    if (!btn) return;

    e.preventDefault();
    const id = btn.getAttribute('data-id');
    const item = items.find(x => x.id === id);
    if (!item) return;

    // Create a simple accessible modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content" role="dialog" aria-modal="true" aria-label="${item.title}">
        <button class="close" aria-label="Close dialog">&times;</button>
        <h2>${item.title}</h2>
        <address>${item.address}</address>
        <p>${item.description}</p>
      </div>
    `;
    document.body.appendChild(modal);

    // show modal
    modal.style.display = 'block';
    const closeBtn = modal.querySelector('.close');
    closeBtn.focus();

    function removeModal() {
      modal.remove();
      document.removeEventListener('keydown', onKey);
    }
    closeBtn.addEventListener('click', removeModal);
    modal.addEventListener('click', (evt) => {
      if (evt.target === modal) removeModal();
    });

    function onKey(evt) {
      if (evt.key === 'Escape') removeModal();
    }
    document.addEventListener('keydown', onKey);
  });
}

// Initialize page
function init() {
  renderVisitMessage();
  buildCards(discoverItems);
  initLearnMore(discoverItems);

  // Footer year if present
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', init);
