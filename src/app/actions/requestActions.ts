import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";

export const sendRequest = async (senderId: string, receiverId: string) => {
  try {
    // Save request to database
    const request = await prisma.request.create({
      data: {
        senderId,
        receiverId,
      },
    });

    // Trigger Pusher event
    await pusherServer.trigger(`user-${receiverId}`, "new-request", {
      senderId,
      requestId: request.id,
    });

    return request;
  } catch (error) {
    console.error("Error sending request:", error);
    throw new Error("Failed to send request.");
  }
};

export const acceptRequest = async (requestId: string) => {
  try {
    // Update request status in database
    const request = await prisma.request.update({
      where: { id: requestId },
      data: { status: "ACCEPTED" },
    });

    // Trigger Pusher event
    await pusherServer.trigger(`user-${request.senderId}`, "request-accepted", {
      requestId,
    });

    return request;
  } catch (error) {
    console.error("Error accepting request:", error);
    throw new Error("Failed to accept request.");
  }
};
