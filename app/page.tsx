import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedRecipes from '@/components/FeaturedRecipes'
import RecipeOfTheDay from '@/components/RecipeOfTheDay'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <RecipeOfTheDay />
        <FeaturedRecipes />
      </main>
      <Footer />
    </div>
  )
}