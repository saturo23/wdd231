// storage.js
const FAV_KEY = 'aetherion_favs';
const THEME_KEY = 'aetherion_theme';

export function getFavs(){
  try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
  catch { return []; }
}
export function toggleFav(id){
  const arr = getFavs();
  const idx = arr.indexOf(id);
  if(idx === -1) arr.push(id); else arr.splice(idx,1);
  localStorage.setItem(FAV_KEY, JSON.stringify(arr));
  return arr;
}
export function isFav(id){ return getFavs().includes(id); }

export function getTheme(){ return localStorage.getItem(THEME_KEY) || 'light'; }
export function setTheme(t){ localStorage.setItem(THEME_KEY, t); }
