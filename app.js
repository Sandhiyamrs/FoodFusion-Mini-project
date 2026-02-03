// Simple client-side recipe finder + favorites (localStorage)
// Enhanced version with autocomplete, type filter, and modal animation

const RECIPES = [
  {
    id: 'r1',
    title: 'Margherita Pizza',
    type: 'Pizza',
    ingredients: ['flour','water','yeast','salt','tomato','mozzarella','basil','olive oil'],
    img: 'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg',
    instructions: 'Make dough, top with tomato sauce and mozzarella, bake until crust is golden. Garnish with basil.'
  },
  {
    id: 'r2',
    title: 'Tomato Basil Soup',
    type: 'Soup',
    ingredients: ['tomato','onion','garlic','basil','cream','olive oil','salt','pepper'],
    img: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    instructions: 'Sauté onion & garlic, add tomatoes, simmer, blend, add cream and basil.'
  },
  {
    id: 'r3',
    title: 'Cheesy Garlic Bread',
    type: 'Bread',
    ingredients: ['bread','butter','garlic','mozzarella','parsley','salt'],
    img: 'images/cheesy_garlic.jpg',
    instructions: 'Spread garlic butter on bread, top with cheese, bake until melted and golden.'
  },
  {
    id: 'r4',
    title: 'Caprese Salad',
    type: 'Salad',
    ingredients: ['tomato','mozzarella','basil','olive oil','salt','pepper'],
    img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=60',
    instructions: 'Slice tomato and mozzarella, layer with basil leaves, drizzle with olive oil and season.'
  },
  {
    id: 'r5',
    title: 'Pasta Aglio e Olio',
    type: 'Pasta',
    ingredients: ['pasta','garlic','olive oil','chili flakes','parsley','salt'],
    img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=60',
    instructions: 'Cook pasta al dente, sauté garlic in olive oil, toss pasta with oil and chili, finish with parsley.'
  }
];

// DOM refs
const cardsEl = document.getElementById('cards');
const searchBtn = document.getElementById('searchBtn');
const showAllBtn = document.getElementById('showAllBtn');
const ingredientInput = document.getElementById('ingredientInput');
const resultsTitle = document.getElementById('resultsTitle');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const tpl = document.getElementById('cardTpl');
const typeFilter = document.createElement('select'); // dynamic type filter
const suggestionList = document.createElement('datalist'); // autocomplete

document.body.appendChild(typeFilter);
document.body.appendChild(suggestionList);

// favorites in localStorage
const FAV_KEY = 'foodfusion_favs_v2';
function loadFavs(){ try{ return JSON.parse(localStorage.getItem(FAV_KEY) || '[]') }catch(e){return []} }
function saveFavs(arr){ localStorage.setItem(FAV_KEY, JSON.stringify(arr)) }

let favorites = new Set(loadFavs());

// --- ENHANCEMENTS ---
// 1️⃣ Setup autocomplete suggestions
const allIngredients = Array.from(new Set(RECIPES.flatMap(r=>r.ingredients)));
allIngredients.forEach(i=>{
  const opt = document.createElement('option');
  opt.value = i;
  suggestionList.appendChild(opt);
});
ingredientInput.setAttribute('list','datalist');

// 2️⃣ Setup type filter dropdown
const types = Array.from(new Set(RECIPES.map(r=>r.type)));
typeFilter.innerHTML = `<option value="">All Types</option>` + types.map(t=>`<option value="${t}">${t}</option>`).join('');
typeFilter.style.marginLeft = '8px';
typeFilter.addEventListener('change', ()=>{ searchBtn.click(); });

// --- FUNCTIONS ---
function renderRecipes(list){
  cardsEl.innerHTML = '';
  if(!list.length){ 
    cardsEl.innerHTML = '<p style="color:var(--muted)">No recipes found. Try different ingredients or click "Show All".</p>'; 
    return; 
  }
  list.forEach(r => {
    const node = tpl.content.cloneNode(true);
    const art = node.querySelector('.card');
    art.querySelector('.card-img').style.backgroundImage = `url(${r.img})`;
    art.querySelector('.card-title').textContent = r.title;
    art.querySelector('.card-ingredients').textContent = r.ingredients.slice(0,6).join(', ') + (r.ingredients.length>6?'...':'');
    
    const favBtn = art.querySelector('.fav-btn');
    if(favorites.has(r.id)) favBtn.classList.add('active');
    favBtn.setAttribute('title','Add/Remove favorite');
    favBtn.addEventListener('click', ()=>{
      favorites.has(r.id)?favorites.delete(r.id):favorites.add(r.id);
      favBtn.classList.toggle('active');
      saveFavs(Array.from(favorites));
    });
    
    const viewBtn = art.querySelector('.view-btn');
    viewBtn.setAttribute('title','View full recipe');
    viewBtn.addEventListener('click', ()=> openModal(r));

    cardsEl.appendChild(node);
  });
}

function normalizeInput(text){
  return text.split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);
}

function searchByIngredients(text){
  const query = normalizeInput(text);
  if(!query.length) return RECIPES.slice();
  let results = RECIPES.filter(r => query.every(q => r.ingredients.some(i => i.toLowerCase().includes(q))));
  const selectedType = typeFilter.value;
  if(selectedType) results = results.filter(r=>r.type===selectedType);
  return results;
}

function openModal(recipe){
  modal.setAttribute('aria-hidden','false');
  modalContent.innerHTML = `
    <div>
      <div class="recipe-img" style="background-image:url(${recipe.img})"></div>
      <h2>${recipe.title}</h2>
      <div class="recipe-ingredients"><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</div>
      <div style="margin-top:12px;"><strong>Instructions:</strong><p style="margin:6px 0 0;color:var(--muted)">${recipe.instructions}</p></div>
    </div>
  `;
}

function closeModal(){ modal.setAttribute('aria-hidden','true'); modalContent.innerHTML=''; }

// --- EVENTS ---
searchBtn.addEventListener('click', ()=>{
  const q = ingredientInput.value;
  const results = searchByIngredients(q);
  resultsTitle.textContent = q ? `Results for: ${q}` : 'Search Results';
  renderRecipes(results);
});

showAllBtn.addEventListener('click', ()=>{
  ingredientInput.value = '';
  typeFilter.value = '';
  resultsTitle.textContent = 'Popular Recipes';
  renderRecipes(RECIPES);
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal() });

// --- INITIAL RENDER ---
renderRecipes(RECIPES);

// expose for debugging
window.FoodFusion = { RECIPES, searchByIngredients, loadFavs };
