"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Users, Heart } from "lucide-react";

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

export default function FeaturedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        const response = await fetch("/api/recipes?limit=8");
        if (response.ok) {
          const data = await response.json();
          setRecipes(data.recipes);
        }
      } catch (error) {
        console.error("Error fetching featured recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedRecipes();
  }, []);

  const toggleFavorite = (recipeId: string) => {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
              Popular Choices
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-6" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Loading delicious recipes...
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-56 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded mb-6"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
            Popular Choices
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most loved recipes, carefully curated by our community
            of food enthusiasts
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.map((recipe, index) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="recipe-card group animate-slide-up block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-56">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay Elements */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="flex flex-wrap gap-2">
                    {recipe.dietary.slice(0, 2).map((diet) => (
                      <span
                        key={diet}
                        className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {diet}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => toggleFavorite(recipe.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                      favorites.includes(recipe.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/90 text-gray-600 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(recipe.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">
                      {recipe.rating}
                    </span>
                    <span className="text-sm text-gray-600">
                      ({recipe.reviews})
                    </span>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                    {recipe.category}
                  </span>
                </div>
                <h3 className="text-xl font-playfair font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {recipe.description}
                </p>
                {/* Recipe Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
                {/* Action Button */}
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="w-full btn-primary py-3 font-semibold hover:scale-105 transition-transform block text-center"
                >
                  View Recipe
                </Link>
              </div>
            </Link>
          ))}
        </div>
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/recipes"
            className="btn-secondary text-lg px-8 py-4 hover:scale-105 transition-transform inline-block"
          >
            View All Recipes
          </Link>
        </div>
      </div>
    </section>
  );
}
