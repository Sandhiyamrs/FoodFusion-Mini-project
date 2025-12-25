'use client';

import { useState, useEffect } from 'react';

interface Recipe {
  id: string;
  title: string;
  type: string;
  ingredients: string[];
  img: string;
  instructions: string;
}

const RECIPES: Recipe[] = [
  {
    id: 'r1',
    title: 'Margherita Pizza',
    type: 'Pizza',
    ingredients: ['flour', 'water', 'yeast', 'salt', 'tomato', 'mozzarella', 'basil', 'olive oil'],
    img: 'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg',
    instructions: 'Make dough, top with tomato sauce and mozzarella, bake until crust is golden. Garnish with basil.',
  },
  {
    id: 'r2',
    title: 'Tomato Basil Soup',
    type: 'Soup',
    ingredients: ['tomato', 'onion', 'garlic', 'basil', 'cream', 'olive oil', 'salt', 'pepper'],
    img: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    instructions: 'Sauté onion & garlic, add tomatoes, simmer, blend, add cream and basil.',
  },
  {
    id: 'r3',
    title: 'Cheesy Garlic Bread',
    type: 'Bread',
    ingredients: ['bread', 'butter', 'garlic', 'mozzarella', 'parsley', 'salt'],
    img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=800&q=60',
    instructions: 'Spread garlic butter on bread, top with cheese, bake until melted and golden.',
  },
  {
    id: 'r4',
    title: 'Caprese Salad',
    type: 'Salad',
    ingredients: ['tomato', 'mozzarella', 'basil', 'olive oil', 'salt', 'pepper'],
    img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=60',
    instructions: 'Slice tomato and mozzarella, layer with basil leaves, drizzle with olive oil and season.',
  },
  {
    id: 'r5',
    title: 'Pasta Aglio e Olio',
    type: 'Pasta',
    ingredients: ['pasta', 'garlic', 'olive oil', 'chili flakes', 'parsley', 'salt'],
    img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=60',
    instructions: 'Cook pasta al dente, sauté garlic in olive oil, toss pasta with oil and chili, finish with parsley.',
  },
];

const INGREDIENT_SUGGESTIONS = [
  'flour',
  'water',
  'yeast',
  'salt',
  'tomato',
  'mozzarella',
  'basil',
  'olive oil',
  'onion',
  'garlic',
  'cream',
  'pepper',
  'bread',
  'butter',
  'parsley',
  'pasta',
  'chili flakes',
];

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES);
  const [searchInput, setSearchInput] = useState('');
  const [filteredType, setFilteredType] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter recipes based on search and type filter
  useEffect(() => {
    let filtered = RECIPES;

    if (filteredType) {
      filtered = filtered.filter((r) => r.type === filteredType);
    }

    if (searchInput.trim()) {
      const ingredients = searchInput
        .split(',')
        .map((ing) => ing.trim().toLowerCase())
        .filter((ing) => ing);
      filtered = filtered.filter((recipe) =>
        ingredients.every((ing) =>
          recipe.ingredients.some((recIng) => recIng.toLowerCase().includes(ing))
        )
      );
    }

    setRecipes(filtered);
  }, [searchInput, filteredType]);

  // Handle autocomplete suggestions
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    const lastIngredient = value.split(',').pop()?.trim().toLowerCase() || '';

    if (lastIngredient.length > 0) {
      const filtered = INGREDIENT_SUGGESTIONS.filter((ing) =>
        ing.toLowerCase().startsWith(lastIngredient)
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const ingredients = searchInput.split(',');
    ingredients[ingredients.length - 1] = suggestion;
    const newValue = ingredients.join(', ');
    setSearchInput(newValue + ', ');
    setSuggestions([]);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const handleShowAll = () => {
    setSearchInput('');
    setFilteredType('');
  };

  const types = ['Pizza', 'Soup', 'Bread', 'Salad', 'Pasta'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf8f6] to-[#f5f0eb]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e8ddd5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#2d1f15]">FoodFusion</h1>
            <div className="text-sm text-[#6b5b4f]">Discover Delicious Recipes</div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ingredients (e.g., garlic, tomato, pasta)..."
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-3 bg-[#f9f6f3] border border-[#e0d5ca] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] text-[#2d1f15] placeholder-[#9e8b7e]"
            />
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e0d5ca] rounded-lg shadow-lg z-10">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSuggestionClick(sug)}
                    className="w-full text-left px-4 py-2 hover:bg-[#f9f6f3] text-[#2d1f15] transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-[#2d1f15] mb-2">Filter by Type:</label>
            <select
              value={filteredType}
              onChange={(e) => setFilteredType(e.target.value)}
              className="px-4 py-2 bg-white border border-[#e0d5ca] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] text-[#2d1f15]"
            >
              <option value="">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleShowAll}
              className="px-6 py-2 bg-[#e8ddd5] hover:bg-[#ddd2ca] text-[#2d1f15] font-semibold rounded-lg transition-colors"
            >
              Show All
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-12">
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden bg-[#f9f6f3]">
                  <img
                    src={recipe.img || "/placeholder.svg"}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(recipe.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    aria-label={favorites.includes(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <span className={`text-xl ${favorites.includes(recipe.id) ? 'text-[#d4a574]' : 'text-[#b8a89a]'}`}>
                      ♥
                    </span>
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#2d1f15] mb-2">{recipe.title}</h3>
                  <span className="inline-block px-3 py-1 bg-[#f9f6f3] text-[#6b5b4f] text-xs font-semibold rounded-full mb-3">
                    {recipe.type}
                  </span>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-[#6b5b4f] mb-2">First 6 Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.slice(0, 6).map((ing) => (
                        <span
                          key={ing}
                          className="text-xs px-2 py-1 bg-[#faf8f6] text-[#6b5b4f] rounded border border-[#e8ddd5]"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="w-full px-4 py-2 bg-[#d4a574] hover:bg-[#c89860] text-white font-semibold rounded-lg transition-colors"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-[#6b5b4f]">No recipes found. Try a different search or filter.</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96 overflow-hidden bg-[#f9f6f3]">
              <img
                src={selectedRecipe.img || "/placeholder.svg"}
                alt={selectedRecipe.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
                aria-label="Close modal"
              >
                <span className="text-2xl text-[#2d1f15]">✕</span>
              </button>
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold text-[#2d1f15] mb-2">{selectedRecipe.title}</h2>
              <p className="text-[#6b5b4f] mb-6 text-sm">Type: {selectedRecipe.type}</p>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#2d1f15] mb-4">Ingredients:</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {selectedRecipe.ingredients.map((ing) => (
                    <li
                      key={ing}
                      className="flex items-center text-[#6b5b4f] before:content-['•'] before:mr-3 before:text-[#d4a574]"
                    >
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#2d1f15] mb-4">Instructions:</h3>
                <p className="text-[#6b5b4f] leading-relaxed">{selectedRecipe.instructions}</p>
              </div>

              <div className="flex gap-3 pt-6 border-t border-[#e8ddd5]">
                <button
                  onClick={() => toggleFavorite(selectedRecipe.id)}
                  className={`flex-1 px-4 py-3 font-semibold rounded-lg transition-colors ${
                    favorites.includes(selectedRecipe.id)
                      ? 'bg-[#d4a574] text-white'
                      : 'bg-[#f9f6f3] text-[#d4a574] border border-[#e8ddd5]'
                  }`}
                >
                  {favorites.includes(selectedRecipe.id) ? '♥ Favorited' : '♡ Add to Favorites'}
                </button>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="flex-1 px-4 py-3 bg-[#e8ddd5] hover:bg-[#ddd2ca] text-[#2d1f15] font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#2d1f15] text-white/80 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2025 FoodFusion. All rights reserved. Discover amazing recipes with us.</p>
        </div>
      </footer>
    </div>
  );
}
