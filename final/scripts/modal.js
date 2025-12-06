// modal.js
const modal = document.getElementById('detail-modal');
const titleEl = modal?.querySelector('#modal-title');
const descEl = modal?.querySelector('#modal-desc');
const featuresEl = modal?.querySelector('#modal-features');
const linkEl = modal?.querySelector('#modal-link');
const closeBtn = modal?.querySelector('.modal-close');
export function openModal(item, favCallback){
  if(!modal) return;
  titleEl.textContent = item.name;
  descEl.textContent = item.description;
  featuresEl.innerHTML = (item.features||[]).map(f=>`<li>${f}</li>`).join('');
  linkEl.href = item.link || '#';
  // attach fav button handler if provided
  modal.setAttribute('aria-hidden','false');
  modal.focus();
}
export function closeModal(){
  if(!modal) return;
  modal.setAttribute('aria-hidden','true');
}
if(closeBtn) closeBtn.addEventListener('click', closeModal);
if(modal) modal.addEventListener('click', e => { if(e.target===modal) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
