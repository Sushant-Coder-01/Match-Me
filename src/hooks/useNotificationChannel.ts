import { usePathname, useSearchParams } from "next/navigation";
import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef } from "react";
import useMessageStore from "./useMessageStore";
import { pusherClient } from "@/lib/pusher";
import { MessageDto } from "@/types";
import { useShallow } from "zustand/react/shallow";

export const useNotificationChannel = (userId: string | null) => {
  const channelRef = useRef<Channel | null>(null);
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const { add, updateUnreadCount } = useMessageStore(
    useShallow((state) => ({
      add: state.add,
      updateUnreadCount: state.updateUnreadCount,
    }))
  );

  const handleNewMessage = useCallback(
    (message: MessageDto) => {
      if (
        pathName === "/messages" &&
        searchParams.get("container") !== "outbox"
      ) {
        add(message);
        updateUnreadCount(1);
      } else if (pathName !== `/messages/${message.senderId}/chat`) {
        updateUnreadCount(1);
      }
    },
    [add, updateUnreadCount, pathName, searchParams]
  );

  useEffect(() => {
    if (!userId) return;
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(`private-${userId}`);

      channelRef.current.bind("message-new", handleNewMessage);
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind("message-new", handleNewMessage);
        channelRef.current = null;
      }
    };
  }, [userId, handleNewMessage]);
};
