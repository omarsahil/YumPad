import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
        <p className="mb-4">
          We want you to be satisfied with your YumPad Premium experience. If
          you are not satisfied, please review our refund policy below.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Eligibility</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>
            Refunds are available within 7 days of purchase for first-time
            premium subscribers
          </li>
          <li>No refunds for renewal payments or after 7 days</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">
          How to Request a Refund
        </h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li>
            Email us at mdomarsahil@gmail.com with your account details and
            payment receipt
          </li>
          <li>We will process eligible refunds within 5-7 business days</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
        <p className="mb-4">For questions, contact mdomarsahil@gmail.com</p>
        <p className="mt-8 text-gray-500">Last updated: July 2025</p>
      </main>
      <Footer />
    </div>
  );
}
