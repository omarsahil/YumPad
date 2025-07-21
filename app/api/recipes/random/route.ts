import { NextRequest, NextResponse } from 'next/server'
import { MealDBService } from '@/lib/mealdb'

export async function GET(request: NextRequest) {
  try {
    const mealDBRecipe = await MealDBService.getRandomRecipe()
    
    if (!mealDBRecipe) {
      throw new Error('No random recipe found')
    }

    const recipe = MealDBService.convertToInternalFormat(mealDBRecipe)

    return NextResponse.json({ recipe })
  } catch (error) {
    console.error('Error fetching random recipe from MealDB:', error)
    
    // Fallback to mock data if API fails
    const mockRecipe = {
      id: 'mock-random',
      title: 'Classic Spaghetti Carbonara',
      description: 'A timeless Roman pasta dish featuring silky eggs, crispy pancetta, and aged Pecorino Romano cheese. This authentic recipe delivers restaurant-quality results in your home kitchen.',
      image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?q=80&w=1974&auto=format&fit=crop',
      category: 'Dinner',
      dietary: [],
      prepTime: '10 mins',
      cookTime: '15 mins',
      servings: '4',
      rating: 4.8,
      reviews: 125,
      ingredients: [
        '400g spaghetti',
        '200g pancetta or guanciale, diced',
        '4 large free-range eggs',
        '100g Pecorino Romano cheese, grated',
        'Freshly ground black pepper',
        'Sea salt'
      ],
      instructions: [
        'Bring a large pot of salted water to boil and cook spaghetti according to package directions.',
        'While pasta cooks, heat a large skillet over medium heat and cook pancetta until crispy, about 5-7 minutes.',
        'In a bowl, whisk together eggs, grated Pecorino, and plenty of black pepper.',
        'Reserve 1 cup pasta water, then drain pasta.',
        'Immediately add hot pasta to the skillet with pancetta, tossing to combine.',
        'Remove from heat and quickly stir in egg mixture, adding pasta water gradually until creamy.',
        'Serve immediately with extra cheese and black pepper.'
      ]
    }

    return NextResponse.json({ recipe: mockRecipe })
  }
}