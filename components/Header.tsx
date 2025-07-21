"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { Menu, X, ChefHat, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Add Razorpay to the window type for TypeScript
declare global {
  interface Window {
    Razorpay?: any;
  }
}

// Load Razorpay script
function useRazorpayScript() {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
}

function PricingModal({
  open,
  onClose,
  onGetPremium,
}: {
  open: boolean;
  onClose: () => void;
  onGetPremium: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-700">
          YumPad Pricing
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-100 rounded-xl p-4 text-center">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>✔️ Access to basic recipes</li>
              <li>✔️ Search & filter recipes</li>
              <li>✔️ Save favorites</li>
              <li>❌ No meal planner</li>
              <li>❌ No exclusive recipes</li>
              <li>❌ No daily premium picks</li>
            </ul>
            <div className="mt-4 text-lg font-bold text-gray-500">Free</div>
          </div>
          <div className="bg-yellow-100 rounded-xl p-4 text-center border-2 border-yellow-400">
            <h3 className="text-xl font-semibold mb-2 text-yellow-700">
              Premium
            </h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>✔️ All Free features</li>
              <li>✔️ Meal planner</li>
              <li>✔️ Exclusive premium recipes</li>
              <li>✔️ Daily premium picks</li>
              <li>✔️ Priority support</li>
            </ul>
            <div className="mt-4 text-lg font-bold text-yellow-700">
              ₹499/month
            </div>
          </div>
        </div>
        <button
          className="w-full btn-primary bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl text-lg transition-colors"
          onClick={onGetPremium}
        >
          Get Premium
        </button>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn, user } = useUser();
  const [showPricing, setShowPricing] = useState(false);
  useRazorpayScript();

  const isPremium = user && user.publicMetadata?.isPremium;

  const handleRazorpay = async () => {
    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 499,
          currency: "INR",
          userId: user?.id,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        alert("Error creating order: " + text);
        return;
      }
      let order;
      try {
        order = await res.json();
      } catch (err) {
        const text = await res.text();
        alert("Unexpected response from server: " + text);
        return;
      }
      if (!order || !order.id) {
        alert("Failed to create Razorpay order.");
        return;
      }
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "YumPad Premium",
        description: "Upgrade to premium",
        handler: function (response: any) {
          // Show a toast or alert, then reload to update premium status
          alert("Payment successful! Welcome to Premium.");
          window.location.reload();
        },
        prefill: {
          email: user?.primaryEmailAddress?.emailAddress,
        },
        theme: { color: "#10b981" },
      };
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("An error occurred while starting payment: " + error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/meal-planner", label: "Meal Planner" },
    { href: "/favorites", label: "Favorites" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-emerald-600 to-emerald-800"
    >
      <nav className="container mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-emerald-600 rounded-xl"
            >
              <ChefHat className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl sm:text-2xl font-playfair font-bold text-white group-hover:text-yellow-300 transition-colors">
              YumPad
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-emerald-200 font-medium transition-colors relative group text-base sm:text-lg"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>
          {/* Auth & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isPremium ? (
              <span className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold text-white bg-yellow-500 shadow text-xs sm:text-sm mr-1 sm:mr-2">
                Premium
              </span>
            ) : (
              <button
                className="btn-primary px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold text-white bg-yellow-400 hover:bg-yellow-500 transition-colors shadow text-xs sm:text-sm mr-1 sm:mr-2"
                onClick={() => setShowPricing(true)}
              >
                Go Premium
              </button>
            )}
            {/* Auth Buttons */}
            {isSignedIn ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="hidden sm:block text-xs sm:text-sm text-white">
                  Welcome, {user?.firstName || "Chef"}!
                </span>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-emerald-200 hover:ring-emerald-400 transition-all",
                    },
                  }}
                />
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2 sm:space-x-3">
                <SignInButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-xs sm:text-base"
                  >
                    Sign In
                  </motion.button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary text-xs sm:text-base"
                  >
                    Get Started
                  </motion.button>
                </SignUpButton>
              </div>
            )}
            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-emerald-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-2 py-2 border-t border-gray-200"
            >
              <div className="flex flex-col space-y-2 sm:space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-white hover:text-emerald-200 font-medium transition-colors text-base"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                {!isSignedIn && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col space-y-2 pt-2 border-t border-gray-200"
                  >
                    <SignInButton mode="modal">
                      <button className="btn-secondary w-full text-xs sm:text-base">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="btn-primary w-full text-xs sm:text-base">
                        Get Started
                      </button>
                    </SignUpButton>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <PricingModal
        open={showPricing}
        onClose={() => setShowPricing(false)}
        onGetPremium={() => {
          setShowPricing(false);
          handleRazorpay();
        }}
      />
    </motion.header>
  );
}
