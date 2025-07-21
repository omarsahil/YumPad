import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="mb-4">
          YumPad is your ultimate cooking companion, designed to help you
          discover, plan, and create delicious meals with ease.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Our Mission</h2>
        <p className="mb-4">
          To inspire home cooks everywhere with easy-to-follow recipes, smart
          meal planning, and a vibrant food community.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Our Values</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>Quality: Only the best, tested recipes</li>
          <li>Inclusivity: Recipes for all diets and skill levels</li>
          <li>Community: Connecting food lovers worldwide</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
        <p className="mb-4">
          For feedback, partnership, or support, email us at
          mdomarsahil@gmail.com
        </p>
        <p className="mt-8 text-gray-500">Last updated: July 2025</p>
      </main>
      <Footer />
    </div>
  );
}
