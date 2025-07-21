import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ isPremium: false });
  }
  const user = await prisma.user.findUnique({ where: { id } });
  return NextResponse.json({ isPremium: !!user?.isPremium });
}
