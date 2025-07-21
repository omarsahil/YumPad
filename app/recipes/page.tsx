"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import RecipeCard from "@/components/RecipeCard";

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  dietary: string[];
  prepTime: string;
  cookTime: string;
  servings: string;
  rating: number;
  reviews: number;
  ingredients: string[];
  instructions: string[];
}

export default function RecipesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const urlCategory = searchParams?.get("category");
    return urlCategory || "all";
  });
  const [selectedDietary, setSelectedDietary] = useState("all");
  const [suggestedRecipes, setSuggestedRecipes] = useState<Recipe[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const { isSignedIn } = useUser();

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      // Fetch from your own database
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategory !== "all")
        params.append("category", selectedCategory);
      if (selectedDietary !== "all") params.append("dietary", selectedDietary);
      const localRes = await fetch(`/api/recipes?${params.toString()}`);
      const localData = localRes.ok ? await localRes.json() : { recipes: [] };

      // Fetch from MealDB
      const mealdbRes = await fetch(
        `/api/mealdb?search=${encodeURIComponent(searchQuery)}`
      );
      const mealdbData = mealdbRes.ok
        ? await mealdbRes.json()
        : { recipes: [] };

      // Merge and deduplicate recipes by title (case-insensitive)
      const seenTitles = new Set();
      const allRecipes = [...localData.recipes, ...mealdbData.recipes].filter(
        (r) => {
          const title = r.title.toLowerCase();
          if (seenTitles.has(title)) return false;
          seenTitles.add(title);
          return true;
        }
      );

      // Main results: recipes whose title includes the search query
      const mainResults = allRecipes.filter((r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setRecipes(mainResults);

      // Suggestions: recipes that do NOT match the search query
      const suggestions = allRecipes.filter(
        (r) => !r.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestedRecipes(suggestions.slice(0, 8)); // Show up to 8 suggestions
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    if (!isSignedIn) {
      setFavoriteIds([]);
      return;
    }
    try {
      const res = await fetch("/api/favorites");
      if (res.ok) {
        const data = await res.json();
        setFavoriteIds(data.favorites.map((f: any) => f.recipeId));
      }
    } catch (e) {
      setFavoriteIds([]);
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchFavorites();
  }, [isSignedIn, selectedCategory]);

  // Listen for category changes in the URL
  useEffect(() => {
    const urlCategory = searchParams?.get("category");
    if (urlCategory && urlCategory !== selectedCategory) {
      setSelectedCategory(urlCategory);
    }
    if (!urlCategory && selectedCategory !== "all") {
      setSelectedCategory("all");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearch = () => {
    fetchRecipes();
  };

  const handleFavoriteToggle = (recipeId: string, isNowFavorite: boolean) => {
    setFavoriteIds((prev) => {
      if (isNowFavorite) return [...prev, recipeId];
      return prev.filter((id) => id !== recipeId);
    });
  };

  const categories = [
    "all",
    "breakfast",
    "lunch",
    "dinner",
    "dessert",
    "snack",
  ];
  const dietaryOptions = [
    "all",
    "vegetarian",
    "vegan",
    "gluten-free",
    "dairy-free",
    "keto",
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-bold mb-4 text-white">
              Explore All Recipes
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white">
              Discover thousands of delicious recipes from around the world
            </p>
          </div>
        </section>
        {/* Filters Section */}
        <section className="py-6 md:py-8 bg-white shadow-sm">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center">
              {/* Search */}
              <div className="relative flex-1 w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field w-full"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
              </div>
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  // Update the URL when the category changes
                  if (e.target.value === "all") {
                    router.push("/recipes");
                  } else {
                    router.push(`/recipes?category=${e.target.value}`);
                  }
                }}
                className="input-field w-full sm:w-auto min-w-[150px]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all"
                      ? "All Categories"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              {/* Dietary Filter */}
              <select
                value={selectedDietary}
                onChange={(e) => setSelectedDietary(e.target.value)}
                className="input-field w-full sm:w-auto min-w-[150px]"
              >
                {dietaryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "all"
                      ? "All Dietary"
                      : option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSearch}
                className="btn-primary flex items-center space-x-2 w-full sm:w-auto"
              >
                <Filter className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </section>
        {/* Results Section */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-2 sm:px-4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                  >
                    <div className="h-44 sm:h-56 bg-gray-300"></div>
                    <div className="p-4 sm:p-6">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded mb-4"></div>
                      <div className="h-3 bg-gray-300 rounded mb-6"></div>
                      <div className="h-10 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={favoriteIds.includes(recipe.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-4">
                  No recipes found
                </h2>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </section>
        {/* Suggested Recipes Section */}
        {searchQuery && suggestedRecipes.length > 0 && (
          <section className="py-6 md:py-8">
            <div className="container mx-auto px-2 sm:px-4">
              <h2 className="text-lg sm:text-xl font-bold mb-4">
                Suggested Recipes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {suggestedRecipes.map((recipe) => (
                  <Link
                    key={recipe.id}
                    href={`/recipes/${recipe.id}`}
                    className="recipe-card group cursor-pointer block"
                  >
                    <div className="relative h-44 sm:h-56 overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                          {recipe.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center space-x-1">
                        <span className="text-xs sm:text-sm font-medium">
                          31 {recipe.rating}
                        </span>
                        <span className="text-xs text-gray-300">
                          ({recipe.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold font-playfair text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {recipe.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">
                        {recipe.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
