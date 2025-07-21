"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MealPlannerPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Meal Planner
          </h1>
          <p className="text-2xl text-gray-600 mb-8">Coming Soon 🚧</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
