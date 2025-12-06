// tech-init.js
import { getJSON } from './fetch.js';
import { setRaw, filterAndRender } from './render.js';

export async function initTechPage(){
  const search = document.getElementById('search');
  const category = document.getElementById('category');
  const clear = document.getElementById('clear-filters');
  try{
    const data = await getJSON('/final/data/tools.json'); // adjust path if serving from repo root
    setRaw(data);
    // event wiring
    search?.addEventListener('input', ()=> filterAndRender({search:search.value, category:category.value}));
    category?.addEventListener('change', ()=> filterAndRender({search:search.value, category:category.value}));
    clear?.addEventListener('click', ()=>{ if(search) search.value=''; if(category) category.value='all'; filterAndRender(); });
  } catch(err){
    const list = document.getElementById('tools-list');
    list.innerHTML = '<p class="card">Unable to load data. See console for details.</p>';
  }
}
