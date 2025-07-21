"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Clock, Users, ChefHat } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

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

export default function RecipeOfTheDay() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchRecipeOfTheDay = async () => {
      try {
        const response = await fetch("/api/recipes/of-the-day");
        if (response.ok) {
          const data = await response.json();
          setRecipe(data.recipe);
        } else {
          console.error("Failed to fetch recipe of the day:", response.status);
        }
      } catch (error) {
        console.error("Error fetching recipe of the day:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeOfTheDay();
  }, []);

  // Check if recipe is already favorite (optional: implement on mount)
  useEffect(() => {
    const checkFavorite = async () => {
      if (user && recipe) {
        try {
          const res = await fetch(`/api/favorites?recipeId=${recipe.id}`);
          if (res.ok) {
            const data = await res.json();
            setIsFavorite(data.isFavorite);
          }
        } catch {}
      }
    };
    checkFavorite();
  }, [user, recipe]);

  const handleSaveRecipe = async () => {
    if (!user) {
      alert("Please sign in to save favorites");
      return;
    }
    setFavoriteLoading(true);
    try {
      const response = await fetch("/api/favorites", {
        method: isFavorite ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId: recipe?.id }),
      });
      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else {
        throw new Error("Failed to update favorite");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full mb-4">
              <ChefHat className="w-4 h-4" />
              <span className="text-sm font-medium">Featured Today</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
              Recipe of the Day
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Loading today's featured recipe...
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-pulse">
            <div className="lg:flex">
              <div className="lg:w-1/2 bg-gray-300 h-64 lg:h-96"></div>
              <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-8"></div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 h-12 bg-gray-300 rounded"></div>
                  <div className="flex-1 h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <section className="section-padding bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full mb-4">
            <ChefHat className="w-4 h-4" />
            <span className="text-sm font-medium">Featured Today</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
            Recipe of the Day
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked by our culinary experts for your cooking inspiration
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
          <div className="lg:flex">
            {/* Image Section */}
            <div className="lg:w-1/2 relative">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={600}
                height={500}
                className="w-full h-64 lg:h-full object-cover"
              />
              <div className="absolute top-6 left-6">
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
              <div className="absolute top-6 right-6">
                <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {recipe.category}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div>
                <h3 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-4">
                  {recipe.title}
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {recipe.description}
                </p>

                {/* Dietary Tags */}
                {recipe.dietary.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {recipe.dietary.map((diet) => (
                      <span key={diet} className="tag">
                        {diet}
                      </span>
                    ))}
                  </div>
                )}

                {/* Recipe Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Prep Time</div>
                    <div className="font-semibold text-gray-900">
                      {recipe.prepTime}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Total Time</div>
                    <div className="font-semibold text-gray-900">
                      {recipe.cookTime}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Users className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Servings</div>
                    <div className="font-semibold text-gray-900">
                      {recipe.servings}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={recipe ? `/recipes/${recipe.id}` : "#"}
                    className="btn-primary flex-1 text-center py-4 text-lg font-semibold hover:scale-105 transition-transform"
                  >
                    View Full Recipe
                  </Link>
                  <button
                    onClick={handleSaveRecipe}
                    disabled={favoriteLoading}
                    className={`btn-secondary flex-1 text-center py-4 text-lg font-semibold hover:scale-105 transition-transform ${
                      isFavorite ? "bg-red-500 text-white" : ""
                    }`}
                  >
                    {isFavorite ? "Saved" : "Save Recipe"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
