// fetch.js
export async function getJSON(url){
  try{
    const resp = await fetch(url, {cache: 'no-cache'});
    if(!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const json = await resp.json();
    return json;
  } catch(err){
    console.error('getJSON error', err);
    throw err;
  }
}
