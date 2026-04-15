import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    message: "Practice entries are client-side for now. POST can persist to Postgres later.",
  });
}
