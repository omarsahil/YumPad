'use client'

import { useState, useEffect } from 'react'
import { Search, TrendingUp, Clock } from 'lucide-react'

interface SearchSuggestionsProps {
  query: string
  onSuggestionClick: (suggestion: string) => void
  isVisible: boolean
}

const popularSearches = [
  'Chicken Curry',
  'Pasta Carbonara',
  'Beef Stew',
  'Chocolate Cake',
  'Fish and Chips',
  'Vegetable Stir Fry',
  'Pizza Margherita',
  'Chicken Tikka Masala'
]

const recentSearches = [
  'Thai Green Curry',
  'Spaghetti Bolognese',
  'Apple Pie'
]

export default function SearchSuggestions({ query, onSuggestionClick, isVisible }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (query.length > 0) {
      // Filter popular searches based on query
      const filtered = popularSearches.filter(search =>
        search.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }, [query])

  if (!isVisible) return null

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1">
      {query.length > 0 ? (
        // Search suggestions
        suggestions.length > 0 ? (
          <div className="py-2">
            <div className="px-4 py-2 text-sm text-gray-500 font-medium border-b">
              Suggestions
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
              >
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{suggestion}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p>No suggestions found</p>
          </div>
        )
      ) : (
        // Popular and recent searches
        <div className="py-2">
          {/* Recent Searches */}
          <div className="mb-4">
            <div className="px-4 py-2 text-sm text-gray-500 font-medium border-b flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Recent Searches</span>
            </div>
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(search)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
              >
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{search}</span>
              </button>
            ))}
          </div>

          {/* Popular Searches */}
          <div>
            <div className="px-4 py-2 text-sm text-gray-500 font-medium border-b flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Popular Searches</span>
            </div>
            {popularSearches.slice(0, 5).map((search, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(search)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
              >
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{search}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}