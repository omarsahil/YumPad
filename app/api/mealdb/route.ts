import { NextRequest, NextResponse } from "next/server";
import { MealDBService } from "@/lib/mealdb";

// Define the internal recipe type
interface InternalRecipe {
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
  cuisine: string;
  tags: string[];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  let recipes: InternalRecipe[] = [];
  if (search) {
    const mealDbResults = await MealDBService.searchByName(search);
    recipes = mealDbResults.map(MealDBService.convertToInternalFormat);
  }

  return NextResponse.json({ recipes });
}
