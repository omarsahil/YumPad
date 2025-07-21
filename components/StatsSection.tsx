'use client'

import { Users, BookOpen, Star, Award } from 'lucide-react'

const stats = [
  {
    icon: BookOpen,
    value: '10,000+',
    label: 'Recipes',
    description: 'Curated from around the world'
  },
  {
    icon: Users,
    value: '50,000+',
    label: 'Home Cooks',
    description: 'Join our growing community'
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Average Rating',
    description: 'From satisfied users'
  },
  {
    icon: Award,
    value: '100+',
    label: 'Chef Partners',
    description: 'Professional recipes'
  }
]

export default function StatsSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            Trusted by Food Lovers
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of home cooks who have discovered their passion for cooking with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-6 group-hover:bg-emerald-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <stat.icon className="w-8 h-8" />
              </div>
              
              <div className="text-4xl font-bold text-emerald-400 mb-2 animate-bounce-gentle">
                {stat.value}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
              <p className="text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}