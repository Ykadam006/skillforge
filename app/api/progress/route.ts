import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    message:
      "Progress is still primary in the browser (Zustand + localStorage). Set DATABASE_URL in .env.local, run migrations, then GET /api/db/health to verify Neon.",
  });
}
