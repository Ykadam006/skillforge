import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** GET /api/db/health — verifies DATABASE_URL and Neon reachability (no secrets in response). */
export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { ok: false, error: "DATABASE_URL is not set. Add it to .env.local (see .env.example)." },
      { status: 503 },
    );
  }

  try {
    await prisma.$queryRaw`SELECT 1 AS ok`;
    return NextResponse.json({ ok: true, provider: "postgresql" });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
