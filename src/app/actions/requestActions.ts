import { pusherServer } from "@/lib/pusher";
import { PrismaClient, RequestStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const sendRequest = async (senderId: string, receiverId: string) => {
  try {
    if (!senderId || !receiverId) {
      throw new Error("Invalid senderId or receiverId");
    }

    // Create the request in the database
    const request = await prisma.request.create({
      data: {
        senderId,
        receiverId,
        status: RequestStatus.PENDING,
      },
    });

    // Serialize the request object
    const serializedRequest = JSON.parse(JSON.stringify(request));

    // Trigger the Pusher event
    await pusherServer.trigger(`user-${receiverId}`, "new-request", {
      request: serializedRequest,
    });

    return serializedRequest;
  } catch (error) {
    console.error("Error sending request:", error);
    throw new Error("Failed to send request.");
  }
};

export const acceptRequest = async (requestId: string) => {
  try {
    if (!requestId) {
      throw new Error("Invalid requestId");
    }

    const request = await prisma.request.update({
      where: { id: requestId },
      data: { status: RequestStatus.ACCEPTED },
    });

    await pusherServer.trigger(`user-${request.senderId}`, "request-accepted", {
      request,
    });

    return request;
  } catch (error) {
    console.error("Error accepting request:", error);
    throw new Error("Failed to accept request.");
  }
};

export const rejectRequest = async (requestId: string) => {
  try {
    if (!requestId) {
      throw new Error("Invalid requestId");
    }

    const request = await prisma.request.update({
      where: { id: requestId },
      data: { status: RequestStatus.REJECTED, rejectedAt: new Date() },
    });

    await pusherServer.trigger(`user-${request.senderId}`, "request-rejected", {
      request,
    });

    return request;
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw new Error("Failed to reject request.");
  }
};

export const checkRequestStatus = async (
  senderId: string,
  receiverId: string
) => {
  try {
    if (!senderId || !receiverId) {
      console.error("Invalid senderId or receiverId");
      return null;
    }

    const request = await prisma.request.findFirst({
      where: {
        senderId,
        receiverId,
      },
    });

    return request;
  } catch (error) {
    console.error("Error checking request status:", error);
    throw new Error("Failed to check request status.");
  }
};
