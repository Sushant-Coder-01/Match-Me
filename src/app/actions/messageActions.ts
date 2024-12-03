"use server";

import { messageSchema, MessageSchema } from "@/lib/schemas/MessageSchema";
import { ActionResult } from "@/types";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { mapMessageToMessageDto } from "@/lib/mappings";

export const createMessage = async (
  recipientUserId: string,
  data: MessageSchema
): Promise<ActionResult<MessageSchema>> => {
  try {
    const userId = await getAuthUserId();

    const validated = messageSchema.safeParse(data);

    if (!validated.success)
      return { status: "error", error: validated.error.errors };

    const { text } = validated.data;

    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recipientUserId,
        senderId: userId,
      },
    });

    return { status: "success", data: message };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong!" };
  }
};

export const getMessageThread = async (recipientId: string) => {
  try {
    const userId = await getAuthUserId();

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, recipientId, senderDeleted: false },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        created: "asc",
      },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: { select: { userId: true, name: true, image: true } },
        recipient: { select: { userId: true, name: true, image: true } },
      },
    });

    if (messages.length > 0) {
      await prisma.message.updateMany({
        where: {
          senderId: recipientId,
          recipientId: userId,
          dateRead: null,
        },
        data: { dateRead: new Date() },
      });
    }

    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.error(error);
    throw error;
  }
};
