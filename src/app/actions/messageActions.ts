"use server";

import { messageSchema, MessageSchema } from "@/lib/schemas/MessageSchema";
import { ActionResult, MessageDto } from "@/types";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { mapMessageToMessageDto } from "@/lib/mappings";
import { pusherServer } from "@/lib/pusher";
import { createChatId } from "@/lib/util";

export const createMessage = async (
  recipientUserId: string,
  data: MessageSchema
): Promise<ActionResult<MessageDto>> => {
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
        messageState: "sent",
      },
      select: messageSelect,
    });

    const messageDto = mapMessageToMessageDto(message);

    await pusherServer.trigger(
      createChatId(userId, recipientUserId),
      "message:new",
      messageDto
    );
    await pusherServer.trigger(
      `private-${recipientUserId}`,
      "message:new",
      messageDto
    );

    return { status: "success", data: messageDto };
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
      select: messageSelect,
    });

    if (messages.length > 0) {
      const deliveredMessageIds = messages
        .filter(
          (m) =>
            m.messageState === "sent" &&
            m.sender?.userId === userId &&
            m.recipient?.userId === recipientId
        )
        .map((m) => m.id);

      await prisma.message.updateMany({
        where: {
          id: { in: deliveredMessageIds },
          messageState: "sent",
        },
        data: { messageState: "delivered" },
      });

      await pusherServer.trigger(
        createChatId(userId, recipientId),
        "message:delivered",
        deliveredMessageIds
      );
    }

    let readCount = 0;

    if (messages.length > 0) {
      const unreadMessageIds = messages
        .filter(
          (m) =>
            m.dateRead === null &&
            m.sender?.userId === recipientId &&
            m.recipient?.userId === userId
        )
        .map((m) => m.id);

      await prisma.message.updateMany({
        where: {
          senderId: recipientId,
          recipientId: userId,
          dateRead: null,
        },
        data: { dateRead: new Date() },
      });

      readCount = unreadMessageIds.length;

      await pusherServer.trigger(
        createChatId(userId, recipientId),
        "message:read",
        unreadMessageIds
      );
    }

    return messages.map(
      (message) => mapMessageToMessageDto(message),
      readCount
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMessagesByContainer = async (container: string) => {
  try {
    const userId = await getAuthUserId();

    const conditions = {
      [container === "outbox" ? "senderId" : "recipientId"]: userId,
      ...(container === "outbox"
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };

    const messages = await prisma.message.findMany({
      where: conditions,
      orderBy: {
        created: "desc",
      },
      select: messageSelect,
    });

    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteMessage = async (messageId: string, isOutbox: boolean) => {
  const selector = isOutbox ? "senderDeleted" : "recipientDeleted";
  try {
    const userId = await getAuthUserId();

    await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        [selector]: true,
      },
    });

    const messagesToDelete = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            recipientId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    });

    if (messagesToDelete.length > 0) {
      await prisma.message.deleteMany({
        where: {
          OR: messagesToDelete.map((m) => ({ id: m.id })),
        },
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const messageSelect = {
  id: true,
  text: true,
  created: true,
  dateRead: true,
  messageState: true,
  sender: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
  recipient: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
};
