import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">
          By using YumPad, you agree to these terms. Please read them carefully.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">
          User Responsibilities
        </h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>Provide accurate information when creating an account</li>
          <li>Do not share your account credentials</li>
          <li>Use the app for personal, non-commercial purposes only</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Acceptable Use</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>No posting of offensive, illegal, or copyrighted content</li>
          <li>No attempts to hack, disrupt, or misuse the service</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Premium Features</h2>
        <p className="mb-4">
          Premium features (such as meal planner and exclusive recipes) are
          available to users with an active subscription. Access may be revoked
          for violation of these terms.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Disclaimer</h2>
        <p className="mb-4">
          YumPad is provided "as is" without warranties of any kind. We are not
          responsible for any health issues or damages resulting from recipes or
          advice on this platform.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
        <p className="mb-4">For questions, contact mdomarsahil@gmail.com</p>
        <p className="mt-8 text-gray-500">Last updated: July 2025</p>
      </main>
      <Footer />
    </div>
  );
}
