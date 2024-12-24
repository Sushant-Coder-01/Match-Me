import { acceptRequest } from "@/app/actions/requestActions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { requestId } = await req.json();
    const request = await acceptRequest(requestId);
    return NextResponse.json(request, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error Accepting Request:", error);
      return NextResponse.json(
        { message: error.message || "Method not allowed" },
        { status: 500 }
      );
    }
  }
}
