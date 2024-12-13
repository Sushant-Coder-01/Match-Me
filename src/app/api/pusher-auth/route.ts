import { auth } from "@/auth";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new Response("Unauthorised", { status: 401 });
    }

    const body = await request.formData();
    const socketId = body.get("socket_id") as string;
    const channel = body.get("channel_name") as string;

    if (!socketId || !channel) {
      return new Response("Bad Request: Missing socket_id or channel_name", {
        status: 400,
      });
    }

    const data = {
      user_id: session.user.id,
    };

    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
    return NextResponse.json(authResponse);
  } catch (error) {
    console.error("Error in pusher auth route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
