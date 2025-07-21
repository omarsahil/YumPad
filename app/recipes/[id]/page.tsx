"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookingMode from "@/components/CookingMode";
import {
  Clock,
  Users,
  Star,
  Heart,
  ChefHat,
  ArrowLeft,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

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
  cuisine?: string;
  tags?: string[];
}

export default function RecipeDetailPage() {
  const params = useParams();
  const { user, isSignedIn } = useUser();
  // Placeholder: Replace with real premium check
  const isPremium = user && user.publicMetadata?.isPremium;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cookingModeOpen, setCookingModeOpen] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setRecipe(data.recipe);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRecipe();
    }
  }, [params.id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically call an API to save/remove from favorites
  };

  const handleAddToMealPlan = async () => {
    if (!isSignedIn || !user) {
      toast.error("Please sign in to add to your meal plan.");
      return;
    }
    if (!recipe) return;
    try {
      const res = await fetch("/api/meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipeId: recipe.id,
          date: new Date().toISOString().split("T")[0], // today
          mealType: "Dinner",
        }),
      });
      if (res.ok) {
        toast.success("Added to your meal plan!");
      } else {
        toast.error("Failed to add to meal plan.");
      }
    } catch (e) {
      toast.error("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="h-96 bg-gray-300 rounded-2xl"></div>
                <div>
                  <div className="h-8 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-8"></div>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-20 bg-gray-200 rounded-xl"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
              Recipe Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The recipe you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/recipes" className="btn-primary">
              Browse All Recipes
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/recipes"
            className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Recipes</span>
          </Link>
        </div>

        {/* Recipe Header */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <button
                onClick={toggleFavorite}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                  isFavorite
                    ? "bg-red-500 text-white"
                    : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
            </div>

            {/* Recipe Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {recipe.category}
                </span>
                {recipe.cuisine && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {recipe.cuisine}
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
                {recipe.title}
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
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
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-500">Total Time</div>
                  <div className="font-semibold text-gray-900">
                    {recipe.cookTime}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <Users className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-500">Servings</div>
                  <div className="font-semibold text-gray-900">
                    {recipe.servings}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2 fill-current" />
                  <div className="text-sm text-gray-500">Rating</div>
                  <div className="font-semibold text-gray-900">
                    {recipe.rating}/5
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    isPremium
                      ? setCookingModeOpen(true)
                      : setShowPricingModal(true)
                  }
                  className={`btn-primary flex-1 py-4 text-lg font-semibold flex items-center justify-center gap-2 ${
                    !isPremium ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  disabled={!isPremium && !isSignedIn}
                >
                  {!isPremium && <Lock className="w-5 h-5 mr-1" />}
                  Start Cooking
                </button>
                <button
                  onClick={() =>
                    isPremium ? isPremium && handleAddToMealPlan() : null
                  }
                  className={`btn-secondary py-4 px-6 flex items-center justify-center gap-2 ${
                    !isPremium ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  disabled={!isPremium}
                  title={
                    !isPremium
                      ? "Upgrade to premium to use the meal planner"
                      : ""
                  }
                >
                  {!isPremium && <Lock className="w-5 h-5 mr-1" />}
                  Add to Meal Plan
                </button>
              </div>

              {/* Pricing Modal */}
              {showPricingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                  <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
                    <button
                      onClick={() => setShowPricingModal(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <h2 className="text-2xl font-bold mb-4 text-center">
                      Upgrade to Premium
                    </h2>
                    <p className="text-gray-700 mb-6 text-center">
                      Unlock Cooking Mode and other premium features by
                      upgrading your account!
                    </p>
                    <div className="flex flex-col gap-4">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-emerald-600 mb-2">
                          $4.99/mo
                        </div>
                        <div className="text-gray-600 mb-2">
                          • Unlimited Cooking Mode
                          <br />• Meal Planner Pro
                          <br />• Early Access to New Recipes
                        </div>
                        <button className="btn-primary w-full mt-2">
                          Upgrade Now
                        </button>
                      </div>
                      <button
                        onClick={() => setShowPricingModal(false)}
                        className="btn-secondary w-full"
                      >
                        Maybe Later
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Ingredients & Instructions */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Ingredients */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6 flex items-center">
                <ChefHat className="w-6 h-6 text-emerald-600 mr-2" />
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                Instructions
              </h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <span className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-playfair font-bold text-gray-900 mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Cooking Mode */}
      {recipe && (
        <CookingMode
          recipe={recipe}
          isOpen={cookingModeOpen}
          onClose={() => setCookingModeOpen(false)}
        />
      )}
    </div>
  );
}
