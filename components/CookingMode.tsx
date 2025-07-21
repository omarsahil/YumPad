'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Clock, CheckCircle, Play, Pause } from 'lucide-react'

interface CookingModeProps {
  recipe: {
    id: string
    title: string
    instructions: string[]
    ingredients: string[]
    cookTime: string
  }
  isOpen: boolean
  onClose: () => void
}

export default function CookingMode({ recipe, isOpen, onClose }: CookingModeProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timer])

  const nextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleStepComplete = () => {
    if (completedSteps.includes(currentStep)) {
      setCompletedSteps(completedSteps.filter(step => step !== currentStep))
    } else {
      setCompletedSteps([...completedSteps, currentStep])
    }
  }

  const startTimer = (minutes: number) => {
    setTimer(minutes * 60)
    setIsTimerRunning(true)
  }

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-playfair font-bold">{recipe.title}</h2>
            <p className="text-emerald-100">Cooking Mode</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-emerald-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Ingredients Sidebar */}
          <div className="w-1/3 bg-gray-50 p-6 overflow-y-auto border-r">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>

            {/* Timer */}
            <div className="mt-8 p-4 bg-white rounded-xl shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3">Timer</h4>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-3">
                  {formatTime(timer)}
                </div>
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => startTimer(5)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                  >
                    5m
                  </button>
                  <button
                    onClick={() => startTimer(10)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                  >
                    10m
                  </button>
                  <button
                    onClick={() => startTimer(15)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                  >
                    15m
                  </button>
                </div>
                <button
                  onClick={toggleTimer}
                  className="flex items-center justify-center space-x-2 w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="flex-1 flex flex-col">
            {/* Progress Bar */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Step {currentStep + 1} of {recipe.instructions.length}
                </span>
                <span className="text-sm text-gray-600">
                  {Math.round(((currentStep + 1) / recipe.instructions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / recipe.instructions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Step */}
            <div className="flex-1 p-8 flex items-center justify-center">
              <div className="text-center max-w-2xl">
                <div className="text-6xl font-bold text-emerald-600 mb-4">
                  {currentStep + 1}
                </div>
                <p className="text-xl text-gray-800 leading-relaxed mb-8">
                  {recipe.instructions[currentStep]}
                </p>
                
                <button
                  onClick={toggleStepComplete}
                  className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    completedSteps.includes(currentStep)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>
                    {completedSteps.includes(currentStep) ? 'Completed' : 'Mark Complete'}
                  </span>
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="p-6 border-t flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex space-x-2">
                {recipe.instructions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStep
                        ? 'bg-emerald-600'
                        : completedSteps.includes(index)
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextStep}
                disabled={currentStep === recipe.instructions.length - 1}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}