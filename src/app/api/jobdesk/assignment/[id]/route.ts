import { WithAuth } from "@/lib/http/WithAuth";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = WithAuth(async () => {
  return NextResponse.json(
    { code: 410, message: "Gone", error: "Endpoint deprecated: jobdesks are assigned by position" },
    { status: 410 }
  );
});
