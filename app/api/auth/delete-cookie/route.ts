import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = NextResponse.json({ message: "cookies deleted" });

  response.cookies.set("token", "", {
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("role", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
