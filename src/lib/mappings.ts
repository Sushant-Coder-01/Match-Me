import { MessageWithSenderRecipient } from "@/types";
import { formatShortDateTime } from "./util";

export const mapMessageToMessageDto = (message: MessageWithSenderRecipient) => {
  return {
    id: message.id,
    text: message.text,
    created: formatShortDateTime(message.created),
    dateRead: message.dateRead ? formatShortDateTime(message.dateRead) : null,
    messageState: message.messageState,
    senderId: message.sender?.userId,
    senderName: message.sender?.name,
    senderImage: message.sender?.image,
    recipientId: message.recipient?.userId,
    recipientImage: message.recipient?.image,
    recipientName: message.recipient?.name,
  };
};
