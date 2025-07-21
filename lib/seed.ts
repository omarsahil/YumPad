import { prisma } from "./db";
import { MealDBService } from "./mealdb";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Custom recipes to always seed
const customRecipes = [
  {
    title: "Chicken Shawarma",
    description:
      "A Middle Eastern dish of spiced, marinated chicken, slow-roasted on a spit and served in pita with garlic sauce and veggies.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    category: "Dinner",
    dietary: ["gluten-free"],
    prepTime: "20 mins",
    cookTime: "40 mins",
    servings: "4",
    rating: 4.8,
    reviews: 120,
    ingredients: [
      "1 kg boneless chicken thighs",
      "4 cloves garlic, minced",
      "2 tbsp plain yogurt",
      "2 tbsp olive oil",
      "1 tbsp ground cumin",
      "1 tbsp ground coriander",
      "1 tbsp ground paprika",
      "1 tsp ground turmeric",
      "1 tsp ground cinnamon",
      "1 tsp cayenne pepper",
      "Salt and pepper to taste",
      "Pita bread, for serving",
      "Fresh vegetables (lettuce, tomato, cucumber)",
      "Garlic sauce or tahini",
    ],
    instructions: [
      "In a bowl, combine yogurt, olive oil, garlic, and all spices. Mix well.",
      "Add chicken and coat thoroughly. Marinate for at least 1 hour (overnight best).",
      "Preheat oven to 220°C (425°F). Place chicken on a baking sheet.",
      "Roast for 35-40 minutes, turning once, until cooked and slightly charred.",
      "Slice chicken thinly. Serve in pita with veggies and garlic sauce.",
    ],
  },
  {
    title: "Chicken Biryani",
    description:
      "A fragrant Indian rice dish with layers of marinated chicken, basmati rice, and aromatic spices.",
    image:
      "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=800&q=80",
    category: "Dinner",
    dietary: [],
    prepTime: "30 mins",
    cookTime: "1 hr",
    servings: "6",
    rating: 4.9,
    reviews: 200,
    ingredients: [
      "1 kg chicken, cut into pieces",
      "2 cups basmati rice",
      "2 onions, sliced",
      "2 tomatoes, chopped",
      "1 cup yogurt",
      "2 tbsp ginger garlic paste",
      "1/2 cup fresh coriander, chopped",
      "1/2 cup fresh mint, chopped",
      "2 tbsp biryani masala",
      "1 tsp turmeric powder",
      "1 tsp red chili powder",
      "Whole spices (bay leaf, cinnamon, cardamom, cloves)",
      "4 cups water",
      "Salt to taste",
      "Ghee or oil",
    ],
    instructions: [
      "Wash and soak rice for 30 minutes. Cook until 70% done, drain and set aside.",
      "Marinate chicken with yogurt, ginger garlic paste, turmeric, chili powder, biryani masala, salt. Set aside 1 hour.",
      "Fry onions in ghee/oil until golden. Remove half for garnish.",
      "Add whole spices, tomatoes, marinated chicken. Cook until chicken is done.",
      "Layer chicken, herbs, and rice in a pot. Top with fried onions.",
      "Cover and cook on low heat (dum) for 20-25 minutes.",
      "Serve hot with raita.",
    ],
  },
];

export async function seedDatabase() {
  console.log("🌱 Seeding database from MealDB...");

  try {
    // Clear existing recipes
    await prisma.recipe.deleteMany();

    // Insert custom recipes first
    for (const recipe of customRecipes) {
      try {
        await prisma.recipe.create({ data: recipe });
        console.log(`Inserted custom recipe: ${recipe.title}`);
      } catch (e) {
        console.error(`Failed to insert custom recipe: ${recipe.title}`, e);
      }
    }

    // Map MealDB categories to app categories
    const categoryMap = [
      { mealdb: "Breakfast", app: "Breakfast" },
      { mealdb: "Chicken", app: "Lunch" },
      { mealdb: "Pasta", app: "Lunch" },
      { mealdb: "Beef", app: "Dinner" },
      { mealdb: "Lamb", app: "Dinner" },
      { mealdb: "Seafood", app: "Dinner" },
    ];

    let allRecipes: any[] = [];
    for (const { mealdb, app } of categoryMap) {
      console.log(`Fetching recipes for category: ${mealdb} (as ${app})`);
      const recipes = await MealDBService.getRecipesByCategory(mealdb);
      // Set the app category
      recipes.forEach((r) => (r.strCategory = app));
      allRecipes.push(...recipes);
      await sleep(100);
    }

    // Remove duplicates by idMeal
    const uniqueRecipesMap = new Map();
    for (const recipe of allRecipes) {
      uniqueRecipesMap.set(recipe.idMeal, recipe);
    }
    // Only import up to 150 unique recipes
    const uniqueRecipes = Array.from(uniqueRecipesMap.values()).slice(0, 150);

    // Convert and insert recipes
    let inserted = 0;
    for (const mealDBRecipe of uniqueRecipes) {
      const recipe = MealDBService.convertToInternalFormat(mealDBRecipe);
      // Exclude fields not in the Prisma model
      const { cuisine, tags, ...recipeData } = recipe;
      try {
        await prisma.recipe.create({ data: recipeData });
        inserted++;
        console.log(`Inserted recipe: ${recipe.title}`);
      } catch (e) {
        console.error(`Failed to insert recipe: ${recipe.title}`, e);
      }
    }

    console.log("✅ Database seeded successfully!");
    console.log(`📊 Inserted ${inserted} recipes from MealDB`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

if (require.main === module) {
  seedDatabase()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
