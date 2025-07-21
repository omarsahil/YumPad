const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes'
const API_KEY = process.env.SPOONACULAR_API_KEY

export interface SpoonacularRecipe {
  id: number
  title: string
  image: string
  imageType: string
  readyInMinutes: number
  servings: number
  summary: string
  cuisines: string[]
  dishTypes: string[]
  diets: string[]
  instructions: string
  extendedIngredients: {
    id: number
    aisle: string
    image: string
    consistency: string
    name: string
    nameClean: string
    original: string
    originalName: string
    amount: number
    unit: string
    meta: string[]
    measures: {
      us: {
        amount: number
        unitShort: string
        unitLong: string
      }
      metric: {
        amount: number
        unitShort: string
        unitLong: string
      }
    }
  }[]
  analyzedInstructions: {
    name: string
    steps: {
      number: number
      step: string
      ingredients: {
        id: number
        name: string
        localizedName: string
        image: string
      }[]
      equipment: {
        id: number
        name: string
        localizedName: string
        image: string
      }[]
      length?: {
        number: number
        unit: string
      }
    }[]
  }[]
  spoonacularScore: number
  spoonacularSourceUrl: string
  healthScore: number
  pricePerServing: number
  cheap: boolean
  creditsText: string
  license: string
  sourceName: string
  sourceUrl: string
}

export interface SearchRecipesParams {
  query?: string
  cuisine?: string
  diet?: string
  type?: string
  number?: number
  offset?: number
  sort?: 'popularity' | 'healthiness' | 'price' | 'time' | 'random'
  sortDirection?: 'asc' | 'desc'
}

export class SpoonacularService {
  private static buildUrl(endpoint: string, params: Record<string, any> = {}): string {
    const url = new URL(`${SPOONACULAR_BASE_URL}${endpoint}`)
    url.searchParams.append('apiKey', API_KEY || '')
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString())
      }
    })
    
    return url.toString()
  }

  static async searchRecipes(params: SearchRecipesParams = {}): Promise<{
    results: SpoonacularRecipe[]
    offset: number
    number: number
    totalResults: number
  }> {
    const url = this.buildUrl('/complexSearch', {
      ...params,
      addRecipeInformation: true,
      fillIngredients: true,
      number: params.number || 12
    })

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Spoonacular API error: ${response.status}`)
    }

    return response.json()
  }

  static async getRecipeById(id: number): Promise<SpoonacularRecipe> {
    const url = this.buildUrl(`/${id}/information`)

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Spoonacular API error: ${response.status}`)
    }

    return response.json()
  }

  static async getRandomRecipes(number: number = 1, tags?: string): Promise<{
    recipes: SpoonacularRecipe[]
  }> {
    const url = this.buildUrl('/random', {
      number,
      tags
    })

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Spoonacular API error: ${response.status}`)
    }

    return response.json()
  }

  static async getSimilarRecipes(id: number, number: number = 2): Promise<{
    id: number
    title: string
    imageType: string
    readyInMinutes: number
    servings: number
    sourceUrl: string
  }[]> {
    const url = this.buildUrl(`/${id}/similar`, { number })

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Spoonacular API error: ${response.status}`)
    }

    return response.json()
  }

  // Convert Spoonacular recipe to our internal format
  static convertToInternalFormat(spoonacularRecipe: SpoonacularRecipe): {
    id: string
    title: string
    description: string
    image: string
    category: string
    dietary: string[]
    prepTime: string
    cookTime: string
    servings: string
    rating: number
    reviews: number
    ingredients: string[]
    instructions: string[]
  } {
    // Extract instructions from analyzedInstructions
    const instructions = spoonacularRecipe.analyzedInstructions.length > 0
      ? spoonacularRecipe.analyzedInstructions[0].steps.map(step => step.step)
      : spoonacularRecipe.instructions 
        ? [spoonacularRecipe.instructions.replace(/<[^>]*>/g, '')] // Remove HTML tags
        : []

    // Extract ingredients
    const ingredients = spoonacularRecipe.extendedIngredients?.map(ing => ing.original) || []

    // Determine category from dish types
    const category = spoonacularRecipe.dishTypes?.length > 0 
      ? spoonacularRecipe.dishTypes[0].charAt(0).toUpperCase() + spoonacularRecipe.dishTypes[0].slice(1)
      : 'Main Course'

    // Clean up summary (remove HTML tags)
    const description = spoonacularRecipe.summary?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || ''

    return {
      id: spoonacularRecipe.id.toString(),
      title: spoonacularRecipe.title,
      description,
      image: spoonacularRecipe.image,
      category,
      dietary: spoonacularRecipe.diets || [],
      prepTime: '15 mins', // Spoonacular doesn't separate prep/cook time
      cookTime: `${spoonacularRecipe.readyInMinutes} mins`,
      servings: spoonacularRecipe.servings.toString(),
      rating: Math.round((spoonacularRecipe.spoonacularScore / 20) * 10) / 10, // Convert to 5-star scale
      reviews: Math.floor(Math.random() * 200) + 50, // Mock reviews since API doesn't provide this
      ingredients,
      instructions
    }
  }
}