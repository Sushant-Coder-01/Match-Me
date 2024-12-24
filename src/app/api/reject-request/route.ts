import { rejectRequest } from "@/app/actions/requestActions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { requestId } = await req.json();

    if (!requestId) {
      return NextResponse.json(
        { message: "Sender ID and Receiver ID are required." },
        { status: 400 }
      );
    }

    const request = await rejectRequest(requestId);

    return NextResponse.json(request, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error rejecting request:", error);
      return NextResponse.json(
        { message: error.message || "Method not allowed" },
        { status: 500 }
      );
    }
  }
}