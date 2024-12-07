"use client";

import PresenceAvatar from "@/components/PresenceAvatar";
import { timeAgo } from "@/lib/util";
import { MessageDto } from "@/types";
import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoCheckmarkSharp } from "react-icons/io5";

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
      <div className="flex flex-col items-end justify-end">
        <PresenceAvatar userId={message.senderId} src={message.senderImage} />
      </div>
    );
  };

  const renderMessageHeader = () => {
    return (
      <div
        className={clsx(
          "flex items-center w-full gap-1",
          isCurrentUserSender ? "justify-end" : "justify-start"
        )}
      >
        <div className="flex flex-row">
          <span className="text-sm font-semibold text-gray-900">
            {message.senderName}
          </span>
          <span className="text-sm text-gray-500 ml-2">{message.created}</span>
        </div>
      </div>
    );
  };

  const renderMessageFooter = () => {
    return (
      <div>
        {message.dateRead ? (
          <span className="flex justify-end items-end gap-2 text-xs text-black italic mx-1">
            (Read {timeAgo(message.dateRead)} ago){" "}
            <IoCheckmarkDoneSharp size={15} className="text-pink-500" />
          </span>
        ) : (
          <span className="flex justify-end items-end gap-2 text-xs text-black italic mx-1">
            {message.messageState === "sent" && <IoCheckmarkSharp size={15} />}
            {message.messageState === "delivered" && (
              <IoCheckmarkDoneSharp size={15} />
            )}
          </span>
        )}
      </div>
    );
  };

  const renderMessageContent = () => {
    const shouldShowReadStatus = message.recipientId !== currentUserId;
    return (
      <div
        className={clsx(
          "flex flex-col px-2 py-1 w-6/12 sm:max-w-[70%]",
          isCurrentUserSender
            ? "rounded-l-xl rounded-tr-xl text-white bg-gradient-to-r from-pink-400/50 to-orange-300/50"
            : "rounded-r-xl rounded-tl-xl text-gray-800 bg-pink-100 border border-pink-200"
        )}
      >
        {renderMessageHeader()}
        <p className="text-sm text-gray-900 py-3 text-start mx-2">
          {message.text}
        </p>
        {shouldShowReadStatus && renderMessageFooter()}
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
