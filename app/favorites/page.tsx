"use client";

import { useUser } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, ChefHat } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";

export default function FavoritesPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleFavoriteToggle = async (
    recipeId: string,
    isNowFavorite: boolean
  ) => {
    if (!isNowFavorite) {
      const confirmed = window.confirm(
        "Are you sure you want to remove this recipe from your favorites?"
      );
      if (!confirmed) return;
      // Remove from favorites
      setFavorites((prev) => prev.filter((r) => r.id !== recipeId));
      // Optionally, call the API to remove favorite (already handled by RecipeCard)
    }
  };

  useEffect(() => {
    if (!isSignedIn) return;
    setLoading(true);
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data.favorites.map((f: any) => f.recipe));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isSignedIn]);

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="max-w-md mx-auto">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
                Sign In to View Favorites
              </h1>
              <p className="text-gray-600 mb-8">
                Create an account or sign in to save your favorite recipes and
                access them anytime.
              </p>
            </div>
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
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
              My Favorite Recipes
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your personal collection of saved recipes
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">Loading...</div>
            ) : favorites.length === 0 ? (
              <div className="text-center py-20">
                <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                  No favorites yet!
                </h2>
                <p className="text-gray-500 mb-8">
                  Start exploring recipes and click the heart icon to save your
                  favorites here.
                </p>
                <button
                  className="btn-primary"
                  onClick={() => router.push("/recipes")}
                >
                  Explore Recipes
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {favorites.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={true}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
