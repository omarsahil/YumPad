import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { recipeId, date, mealType } = await request.json();
    if (!recipeId || !date || !mealType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure user exists in database
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId, email: "" }, // Email will be updated by webhook
    });

    // Add to meal plan
    const mealPlan = await prisma.mealPlan.upsert({
      where: {
        userId_date_mealType: {
          userId,
          date: new Date(date),
          mealType,
        },
      },
      update: { recipeId },
      create: {
        userId,
        recipeId,
        date: new Date(date),
        mealType,
      },
    });

    return NextResponse.json({ success: true, mealPlan });
  } catch (error) {
    console.error("Error adding to meal plan:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
