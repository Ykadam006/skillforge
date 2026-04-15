import { NextResponse } from "next/server";
import { getGuide } from "@/lib/guide";

export function GET() {
  return NextResponse.json(getGuide());
}
