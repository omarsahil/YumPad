import { NextRequest, NextResponse } from "next/server";
import { MealDBService } from "@/lib/mealdb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  let recipes = [];
  if (search) {
    const mealDbResults = await MealDBService.searchByName(search);
    recipes = mealDbResults.map(MealDBService.convertToInternalFormat);
  }

  return NextResponse.json({ recipes });
}
