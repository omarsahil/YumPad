import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. This Privacy Policy explains how
          YumPad collects, uses, and protects your information.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">
          Information We Collect
        </h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>
            Account information (name, email, profile image) via Clerk
            authentication
          </li>
          <li>Recipe and favorites data you save</li>
          <li>Usage data (pages visited, actions taken)</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">
          How We Use Your Information
        </h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>To provide and improve our recipe and meal planning services</li>
          <li>To personalize your experience and save your preferences</li>
          <li>To communicate important updates or offers</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">
          Third-Party Services
        </h2>
        <p className="mb-4">
          We use third-party services such as Clerk (for authentication), Neon
          (for database), and Razorpay (for payments). These services may
          collect and process your data according to their own privacy policies.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Your Rights</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>You can access, update, or delete your account at any time</li>
          <li>
            Contact us at mdomarsahil@gmail.com for privacy-related requests
          </li>
        </ul>
        <p className="mt-8 text-gray-500">Last updated: July 2025</p>
      </main>
      <Footer />
    </div>
  );
}
