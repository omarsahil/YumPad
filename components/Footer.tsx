import Link from "next/link";
import { ChefHat, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <div className="p-2 bg-emerald-600 rounded-xl">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-playfair font-bold">
                YumPad
              </span>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Your ultimate cooking companion. Discover, plan, and create
              delicious meals with ease.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <span className="text-lg">📘</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <span className="text-lg">📷</span>
              </a>
              <a
                href="https://x.com/fromarsahil"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <span className="text-lg">🐦</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <span className="text-lg">📌</span>
              </a>
            </div>
          </div>
          {/* Navigation */}
          <div className="mb-8 lg:mb-0">
            <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">
              Navigate
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-gray-400 text-sm sm:text-base">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes"
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/meal-planner"
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  Meal Planner
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
          {/* Categories */}
          <div className="mb-8 lg:mb-0">
            <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">
              Categories
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-gray-400 text-sm sm:text-base">
              <li>
                <Link
                  href="/recipes?category=breakfast"
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  Breakfast
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=lunch"
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  Lunch
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=dinner"
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  Dinner
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=dessert"
                  className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  Dessert
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-gray-400 text-sm sm:text-base">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-500" />
                <span>mdomarsahil@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="font-semibold">X:</span>
                <a
                  href="https://x.com/fromarsahil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-200 underline"
                >
                  @fromarsahil
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs sm:text-sm">
              &copy; {currentYear} YumPad. All rights reserved.
            </p>
            <div className="flex flex-wrap space-x-4 sm:space-x-6 mt-2 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href="/refund"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Refund Policy
              </Link>
              <Link
                href="/disclaimer"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Disclaimer
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
