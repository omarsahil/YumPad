import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();
    console.log("[DODO WEBHOOK] Received event:", event);

    // Example: event.type === 'payment_success' and event.customer.email
    if (event.type === "payment_success" && event.customer?.email) {
      const email = event.customer.email.toLowerCase();
      // Update user to premium
      const user = await prisma.user.updateMany({
        where: { email },
        data: { isPremium: true },
      });
      console.log(`[DODO WEBHOOK] Upgraded user to premium: ${email}`);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[DODO WEBHOOK] Error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
