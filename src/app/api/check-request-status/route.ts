import { checkRequestStatus } from "@/app/actions/requestActions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const senderId = searchParams.get("senderId");
  const receiverId = searchParams.get("receiverId");

  if (!senderId || !receiverId) {
    return NextResponse.json(
      { message: "Sender ID and Receiver ID are required." },
      { status: 400 }
    );
  }

  try {
    const request = await checkRequestStatus(senderId, receiverId);
    return NextResponse.json(request, { status: 200 });
  } catch (error) {
    console.error("Error checking request status:", error);
    return NextResponse.json(
      { message: "Error checking request status" },
      { status: 500 }
    );
  }
}
