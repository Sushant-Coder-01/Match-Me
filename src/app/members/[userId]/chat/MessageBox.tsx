"use client";

import { MessageDto } from "@/types";
import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import { format } from "date-fns";
import { useEffect, useRef } from "react";

type Props = {
  message: MessageDto;
  currentUserId: string;
};

const MessageBox = ({ message, currentUserId }: Props) => {
  const isCurrentUserSender = currentUserId === message.senderId;

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current)
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messageEndRef]);


  const renderAvatar = () => {
    return (
      <Avatar
        className="self-end"
        name={message.senderName}
        src={message.senderImage || "/images/user.png"}
      />
    );
  };

  const renderMessageHeader = () => {
    const shouldShowReadStatus =
      message.dateRead && message.recipientId !== currentUserId;

    return (
      <div
        className={clsx(
          "flex items-center w-full gap-1",
          isCurrentUserSender ? "justify-end" : "justify-start"
        )}
      >
        {shouldShowReadStatus && (
          <span className="text-xs text-black italic mx-1">
            (Read x mins ago)
          </span>
        )}
        <div className="flex flex-row">
          <span className="text-sm font-semibold text-gray-900">
            {message.senderName}
          </span>
          <span className="text-sm text-gray-500 ml-2">
            {format(new Date(message.created), "MMM dd, yyyy | HH:mm a")}
          </span>
        </div>
      </div>
    );
  };

  const renderMessageContent = () => {
    return (
      <div
        className={clsx(
          "flex flex-col px-2 py-1 w-6/12 sm:max-w-[70%]",
          isCurrentUserSender
            ? "rounded-l-xl rounded-tr-xl text-white bg-blue-100"
            : "rounded-r-xl rounded-tl-xl border-gray-200 bg-green-100"
        )}
      >
        {renderMessageHeader()}
        <p className="text-sm text-gray-900 py-3 text-start mx-2">{message.text}</p>
      </div>
    );
  };

  return (
    <div className="grid grid-rows-1">
      <div
        className={clsx(
          "flex gap-2 mb-3",
          isCurrentUserSender
            ? "justify-end text-right"
            : "justify-start text-left"
        )}
      >
        {!isCurrentUserSender && renderAvatar()}
        {renderMessageContent()}
        {isCurrentUserSender && renderAvatar()}
      </div>
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default MessageBox;
