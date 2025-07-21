import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
        <p className="mb-4">
          All content on YumPad, including recipes and advice, is for
          informational purposes only.
        </p>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>
            We do not guarantee the accuracy or completeness of any recipe or
            advice
          </li>
          <li>
            Always consult a qualified professional for dietary or health
            concerns
          </li>
          <li>
            Use recipes at your own risk; we are not liable for any adverse
            outcomes
          </li>
        </ul>
        <p className="mt-8 text-gray-500">Last updated: July 2025</p>
      </main>
      <Footer />
    </div>
  );
}
