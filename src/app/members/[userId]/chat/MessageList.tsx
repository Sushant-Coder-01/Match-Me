"use client";

import { MessageDto } from "@/types";
import MessageBox from "./MessageBox";
import { useCallback, useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { formatShortDateTime } from "@/lib/util";
import { useSession } from "next-auth/react";
import { Member } from "@prisma/client";
import { BsChatLeftHeart } from "react-icons/bs";
import useMessageStore from "@/hooks/useMessageStore";
import { useShallow } from "zustand/react/shallow";

type Props = {
  initialMessages: {
    messages: MessageDto[];
    readCount: number;
    unreadMessageIds: any[];
  };
  currentUserId: string;
  chatId: string;
  threadUser: Member;
};

const MessageList = ({
  initialMessages,
  currentUserId,
  chatId,
  threadUser,
}: Props) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState(initialMessages.messages);

  const setReadCount = useRef(false);

  const { updateUnreadCount } =
    useMessageStore(
      useShallow((state) => ({
        updateUnreadCount: state.updateUnreadCount,
      }))
    );

  useEffect(() => {
    if (!setReadCount.current) {
      updateUnreadCount(-initialMessages.readCount);
      setReadCount.current = true;
    }
  }, [initialMessages.readCount, updateUnreadCount]);

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
        <div className="flex flex-col mt-32 space-y-2 items-center justify-center text-center text-gray-500">
          <div>
            <BsChatLeftHeart size={50} className="text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            Hi, {session?.user?.name}! <span className="text-2xl">👋</span>
          </h2>
          <p className="text-md text-gray-500">
            Start a conversation with{" "}
            <span className="text-orange-500 font-bold">
              "{threadUser.name}"
            </span>{" "}
            and create a meaningful connection!
          </p>
        </div>
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
