// @ts-ignore
import fetch from "node-fetch";

const MEALDB_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export interface MealDBRecipe {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
  strSource?: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}

export interface MealDBResponse {
  meals: MealDBRecipe[] | null;
}

export class MealDBService {
  // Search recipes by name
  static async searchByName(query: string): Promise<MealDBRecipe[]> {
    try {
      const response = await fetch(
        `${MEALDB_BASE_URL}/search.php?s=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to fetch recipes");
      const data: any = await response.json();
      return data && Array.isArray(data.meals) ? data.meals : [];
    } catch (error) {
      console.error("Error searching recipes by name:", error);
      return [];
    }
  }

  // Get random recipe
  static async getRandomRecipe(): Promise<MealDBRecipe | null> {
    try {
      const response = await fetch(`${MEALDB_BASE_URL}/random.php`);
      if (!response.ok) throw new Error("Failed to fetch random recipe");
      const data: any = await response.json();
      return data && Array.isArray(data.meals) && data.meals[0]
        ? data.meals[0]
        : null;
    } catch (error) {
      console.error("Error fetching random recipe:", error);
      return null;
    }
  }

  // Get multiple random recipes
  static async getMultipleRandomRecipes(
    count: number = 8
  ): Promise<MealDBRecipe[]> {
    try {
      const promises = Array(count)
        .fill(null)
        .map(() => this.getRandomRecipe());
      const results = await Promise.all(promises);
      return results.filter(
        (recipe): recipe is MealDBRecipe => recipe !== null
      );
    } catch (error) {
      console.error("Error fetching multiple random recipes:", error);
      return [];
    }
  }

  // Get recipe by ID
  static async getRecipeById(id: string): Promise<MealDBRecipe | null> {
    try {
      const response = await fetch(`${MEALDB_BASE_URL}/lookup.php?i=${id}`);
      if (!response.ok) throw new Error("Failed to fetch recipe");
      const data: any = await response.json();
      return data && Array.isArray(data.meals) && data.meals[0]
        ? data.meals[0]
        : null;
    } catch (error) {
      console.error("Error fetching recipe by ID:", error);
      return null;
    }
  }

  // Get recipes by category
  static async getRecipesByCategory(category: string): Promise<MealDBRecipe[]> {
    try {
      const response = await fetch(
        `${MEALDB_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
      );
      if (!response.ok) throw new Error("Failed to fetch recipes by category");
      const data: any = await response.json();
      if (!data || !Array.isArray(data.meals)) return [];
      const detailedRecipes = await Promise.all(
        data.meals
          .slice(0, 12)
          .map((meal: any) => this.getRecipeById(meal.idMeal))
      );
      return detailedRecipes.filter(
        (recipe): recipe is MealDBRecipe => recipe !== null
      );
    } catch (error) {
      console.error("Error fetching recipes by category:", error);
      return [];
    }
  }

  // Get recipes by area (cuisine)
  static async getRecipesByArea(area: string): Promise<MealDBRecipe[]> {
    try {
      const response = await fetch(
        `${MEALDB_BASE_URL}/filter.php?a=${encodeURIComponent(area)}`
      );
      if (!response.ok) throw new Error("Failed to fetch recipes by area");
      const data: any = await response.json();
      if (!data || !Array.isArray(data.meals)) return [];
      const detailedRecipes = await Promise.all(
        data.meals
          .slice(0, 12)
          .map((meal: any) => this.getRecipeById(meal.idMeal))
      );
      return detailedRecipes.filter(
        (recipe): recipe is MealDBRecipe => recipe !== null
      );
    } catch (error) {
      console.error("Error fetching recipes by area:", error);
      return [];
    }
  }

  // Get all categories
  static async getCategories(): Promise<
    {
      idCategory: string;
      strCategory: string;
      strCategoryThumb: string;
      strCategoryDescription: string;
    }[]
  > {
    try {
      const response = await fetch(`${MEALDB_BASE_URL}/categories.php`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data: any = await response.json();
      return data && Array.isArray(data.categories) ? data.categories : [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  // Convert MealDB recipe to our internal format
  static convertToInternalFormat(mealDBRecipe: MealDBRecipe): {
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
  } {
    // Extract ingredients and measurements
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealDBRecipe[
        `strIngredient${i}` as keyof MealDBRecipe
      ] as string;
      const measure = mealDBRecipe[
        `strMeasure${i}` as keyof MealDBRecipe
      ] as string;

      if (ingredient && ingredient.trim()) {
        const fullIngredient =
          measure && measure.trim()
            ? `${measure.trim()} ${ingredient.trim()}`
            : ingredient.trim();
        ingredients.push(fullIngredient);
      }
    }

    // Split instructions into steps
    const instructions = mealDBRecipe.strInstructions
      .split(/\r\n|\r|\n/)
      .filter((step) => step.trim().length > 0)
      .map((step) => step.trim());

    // Extract tags
    const tags = mealDBRecipe.strTags
      ? mealDBRecipe.strTags.split(",").map((tag) => tag.trim())
      : [];

    // Determine dietary restrictions based on ingredients and tags
    const dietary: string[] = [];
    const ingredientText = ingredients.join(" ").toLowerCase();
    const instructionText = mealDBRecipe.strInstructions.toLowerCase();

    if (
      !ingredientText.includes("meat") &&
      !ingredientText.includes("chicken") &&
      !ingredientText.includes("beef") &&
      !ingredientText.includes("pork") &&
      !ingredientText.includes("fish") &&
      !ingredientText.includes("seafood")
    ) {
      dietary.push("vegetarian");
    }

    if (tags.some((tag) => tag.toLowerCase().includes("vegan"))) {
      dietary.push("vegan");
    }

    // Generate a description from the first part of instructions
    const description =
      mealDBRecipe.strInstructions.length > 150
        ? mealDBRecipe.strInstructions.substring(0, 150) + "..."
        : mealDBRecipe.strInstructions;

    return {
      id: mealDBRecipe.idMeal,
      title: mealDBRecipe.strMeal,
      description,
      image: mealDBRecipe.strMealThumb,
      category: mealDBRecipe.strCategory,
      dietary,
      prepTime: "15 mins", // MealDB doesn't provide prep time
      cookTime: "30 mins", // MealDB doesn't provide cook time
      servings: "4", // MealDB doesn't provide servings
      rating: Math.round((Math.random() * 2 + 3.5) * 10) / 10, // Generate random rating between 3.5-5.5
      reviews: Math.floor(Math.random() * 200) + 50, // Generate random review count
      ingredients,
      instructions,
      cuisine: mealDBRecipe.strArea,
      tags,
    };
  }
}
