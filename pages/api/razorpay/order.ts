import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { amount, currency, receipt, userId } = req.body;
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  const options = {
    amount: amount * 100,
    currency: currency || "INR",
    receipt: receipt || userId, // Use Clerk userId as receipt
    notes: { userId }, // Store Clerk userId in notes
  };
  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
