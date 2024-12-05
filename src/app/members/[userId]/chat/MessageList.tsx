"use client";

import { MessageDto } from "@/types";
import MessageBox from "./MessageBox";
import { useCallback, useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { formatShortDateTime } from "@/lib/util";

type Props = {
  initialMessages: MessageDto[];
  currentUserId: string;
  chatId: string;
};

const MessageList = ({ initialMessages, currentUserId, chatId }: Props) => {
  const [messages, setMessages] = useState(initialMessages);

  const handleNewMessages = useCallback((newMessages: MessageDto) => {
    setMessages((prevState) => [...prevState, newMessages]);
  }, []);

  const handleDeliveredMessages = useCallback(
    (deliveredMessageIds: string[]) => {
      setMessages((prevState) =>
        prevState.map((message) =>
          deliveredMessageIds.includes(message.id)
            ? { ...message, messageState: "delivered" }
            : message
        )
      );
    },
    []
  );

  const handleReadMessages = useCallback((messagesIds: string[]) => {
    setMessages((prevState) =>
      prevState.map((message) =>
        messagesIds.includes(message.id)
          ? { ...message, dateRead: formatShortDateTime(new Date()) }
          : message
      )
    );
  }, []);

  useEffect(() => {
    const chatChannel = pusherClient.subscribe(chatId);
    chatChannel.bind("message:new", handleNewMessages);
    chatChannel.bind("message:delivered", handleDeliveredMessages);
    chatChannel.bind("message:read", handleReadMessages);

    return () => {
      chatChannel.unsubscribe();
      chatChannel.unbind("message:new", handleNewMessages);
      chatChannel.unbind("message:delivered", handleDeliveredMessages);
      chatChannel.unbind("message:read", handleReadMessages);
    };
  }, [chatId]);

  return (
    <div>
      {messages.length === 0 ? (
        <div>No messages to display</div>
      ) : (
        <div>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageList;
