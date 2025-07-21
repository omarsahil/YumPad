'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, Clock, Users, Star, ChefHat } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

interface Recipe {
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
  authorId?: string
}

interface RecipeCardProps {
  recipe: Recipe
  onFavoriteToggle?: (recipeId: string, isFavorite: boolean) => void
  isFavorite?: boolean
}

export default function RecipeCard({ recipe, onFavoriteToggle, isFavorite = false }: RecipeCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [favoriteLoading, setFavoriteLoading] = useState(false)
  const { user } = useUser()

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) {
      alert('Please sign in to save favorites')
      return
    }

    setFavoriteLoading(true)
    try {
      // Call API to toggle favorite
      const response = await fetch('/api/favorites', {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId: recipe.id })
      })

      if (response.ok) {
        onFavoriteToggle?.(recipe.id, !isFavorite)
      } else {
        throw new Error('Failed to update favorite')
      }
    } catch (error) {
      alert('Something went wrong')
    } finally {
      setFavoriteLoading(false)
    }
  }

  return (
    <div
      className="recipe-card group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          disabled={favoriteLoading}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-300 ${
              isFavorite ? 'fill-current' : ''
            }`} 
          />
        </button>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {recipe.category}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{recipe.rating}</span>
          <span className="text-xs text-gray-300">({recipe.reviews})</span>
        </div>

        {/* Quick Actions (visible on hover) */}
        <div
          className={`absolute bottom-4 right-4 flex space-x-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <ChefHat className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold font-playfair text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {recipe.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Dietary Tags */}
        {recipe.dietary.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.dietary.map((diet) => (
              <span key={diet} className="tag text-xs">
                {diet}
              </span>
            ))}
          </div>
        )}

        {/* Recipe Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full btn-primary hover:scale-105 transition-transform">
          View Recipe
        </button>
      </div>
    </div>
  )
}