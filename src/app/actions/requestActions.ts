import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";

export const sendRequest = async (senderId: string, receiverId: string) => {
  // Save request to database
  const request = await prisma.request.create({
    data: {
      senderId,
      receiverId,
    },
  });

  // Trigger Pusher event
  pusherServer.trigger(`user-${receiverId}`, "new-request", {
    senderId,
    requestId: request.id,
  });

  return request;
};

export const acceptRequest = async (requestId: string) => {
  // Update request status in database
  const request = await prisma.request.update({
    where: { id: requestId },
    data: { status: "ACCEPTED" },
  });

  // Trigger Pusher event
  pusherServer.trigger(`user-${request.senderId}`, "request-accepted", {
    requestId,
  });

  return request;
};
