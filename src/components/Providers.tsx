"use client";

import { getUnreadMessageCount } from "@/app/actions/messageActions";
import useMessageStore from "@/hooks/useMessageStore";
import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

const Providers = ({
  children,
  userId,
  profileComplete,
}: {
  children: ReactNode;
  userId: string | null;
  profileComplete: boolean;
}) => {
  const isUnreadCountSet = useRef(false);

  const { updateUnreadCount } = useMessageStore(
    useShallow((state) => ({
      updateUnreadCount: state.updateUnreadCount,
    }))
  );

  const setUnreadCount = useCallback(
    (amount: number) => {
      updateUnreadCount(amount);
    },
    [updateUnreadCount]
  );

  useEffect(() => {
    if (userId && !isUnreadCountSet.current) {
      getUnreadMessageCount().then((count) => setUnreadCount(count));
      isUnreadCountSet.current = true;
    }
  }, [userId, setUnreadCount]);

  usePresenceChannel(userId, profileComplete);
  useNotificationChannel(userId, profileComplete);
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
