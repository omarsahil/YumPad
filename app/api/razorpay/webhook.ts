import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  // Handle event, e.g., mark user as premium
  if (event.event === "payment.captured") {
    const userId =
      event.payload?.payment?.entity?.notes?.userId ||
      event.payload?.payment?.entity?.receipt;
    if (userId) {
      await prisma.user.updateMany({
        where: { id: userId },
        data: { isPremium: true },
      });
      console.log(`[RAZORPAY WEBHOOK] Upgraded user to premium: ${userId}`);
    }
  }

  return NextResponse.json({ received: true });
}
