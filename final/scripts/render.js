// render.js
import { toggleFav, isFav } from './storage.js';
import { openModal } from './modal.js';

const LIST = document.getElementById('tools-list');
const NO = document.getElementById('no-results');

function truncate(s,n){ return s.length>n ? s.slice(0,n-1)+'…' : s; }

export function renderList(items){
  window._aetherion_items = items;
  if(!items.length){ LIST.innerHTML=''; NO.hidden=false; return; }
  NO.hidden=true;
  LIST.innerHTML = items.map(it => `
    <article class="tool-card" data-id="${it.id}">
      <img src="${it.image}" alt="${it.name} preview" loading="lazy" width="640" height="360">
      <div>
        <h3>${it.name}</h3>
        <div class="tool-meta"><span>${it.category}</span><span>v${it.version}</span></div>
        <p>${truncate(it.description,120)}</p>
        <div class="card-actions">
          <button class="btn open-btn" data-id="${it.id}">Details</button>
          <button class="btn fav-btn" data-id="${it.id}">${isFav(it.id)?'★':'☆'} Favorite</button>
        </div>
      </div>
    </article>
  `).join('');
  // attach listeners
  document.querySelectorAll('.open-btn').forEach(b => b.addEventListener('click', (e)=>{
    const id = Number(e.currentTarget.dataset.id);
    const item = items.find(i=>i.id===id);
    openModal(item);
  }));
  document.querySelectorAll('.fav-btn').forEach(b => b.addEventListener('click', (e)=>{
    const id = Number(e.currentTarget.dataset.id);
    toggleFav(id);
    renderList(window._aetherion_items);
  }));
}

export function filterAndRender({search='',category='all'} = {}){
  let items = (window._aetherion_items_raw || []);
  const s = String(search||'').trim().toLowerCase();
  if(category && category !== 'all') items = items.filter(i => i.category === category);
  if(s) items = items.filter(i => (i.name + ' ' + i.description + ' ' + (i.features||[]).join(' ')).toLowerCase().includes(s));
  items = items.slice().sort((a,b)=> a.name.localeCompare(b.name));
  renderList(items);
}

export function setRaw(items){
  window._aetherion_items_raw = items;
  filterAndRender();
}
