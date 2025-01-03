import { sendRequest } from "@/app/actions/requestActions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { senderId, receiverId } = body;

    if (!senderId || !receiverId) {
      return NextResponse.json(
        { message: "Sender ID and Receiver ID are required." },
        { status: 400 }
      );
    }

    const request = await sendRequest(senderId, receiverId);

    return NextResponse.json(request, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error Sending Request:", error);
      return NextResponse.json(
        { message: error.message || "Method not allowed" },
        { status: 500 }
      );
    }
  }
}
