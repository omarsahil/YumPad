import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const where: any = {};

    if (search) {
      where.title = { contains: search, mode: "insensitive" };
    }
    if (category && category !== "all") {
      where.category = { equals: category, mode: "insensitive" };
    }

    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { title: "asc" },
      }),
      prisma.recipe.count({ where }),
    ]);

    return NextResponse.json({
      recipes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching recipes from database:", error);
    return NextResponse.json({
      recipes: [],
      pagination: { page: 1, limit: 12, total: 0, pages: 1 },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const recipe = await prisma.recipe.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        category: data.category,
        dietary: data.dietary || [],
        prepTime: data.prepTime,
        cookTime: data.cookTime,
        servings: data.servings,
        rating: data.rating || 0,
        reviews: data.reviews || 0,
        ingredients: data.ingredients || [],
        instructions: data.instructions || [],
        authorId: data.authorId,
      },
    });

    return NextResponse.json({ recipe }, { status: 201 });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
