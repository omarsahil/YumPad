import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Get all recipe IDs
    const recipes = await prisma.recipe.findMany({ select: { id: true } });
    if (!recipes.length) {
      return NextResponse.json({ recipe: null });
    }
    // Use the current date to pick a recipe deterministically
    const today = new Date();
    const daySeed =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();
    const index = daySeed % recipes.length;
    const recipeId = recipes[index].id;
    // Fetch the full recipe
    const recipe = await prisma.recipe.findUnique({ where: { id: recipeId } });
    return NextResponse.json({ recipe });
  } catch (error) {
    console.error("Error fetching recipe of the day:", error);
    return NextResponse.json({ recipe: null });
  }
}
