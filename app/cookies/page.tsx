import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
        <p className="mb-4">
          YumPad uses cookies to enhance your experience and analyze site usage.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">What Are Cookies?</h2>
        <p className="mb-4">
          Cookies are small text files stored on your device by your browser.
          They help us remember your preferences and understand how you use our
          site.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Cookies</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>To keep you signed in</li>
          <li>To remember your preferences</li>
          <li>To analyze site traffic and usage patterns</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Your Choices</h2>
        <p className="mb-4">
          You can disable cookies in your browser settings, but some features
          may not work as intended.
        </p>
        <p className="mt-8 text-gray-500">Last updated: July 2025</p>
      </main>
      <Footer />
    </div>
  );
}
