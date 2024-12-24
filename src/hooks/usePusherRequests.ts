import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import { sendResponse } from "@/types";
import { useRequestStore } from "./useRequestStore";

export const usePusherRequests = (userId: string | undefined) => {
  const { setRequestInfo } = useRequestStore();

  useEffect(() => {
    if (!userId) return;

    const channel = pusherClient.subscribe(`user-${userId}`);

    channel.bind("new-request", (data: any) => {
      setRequestInfo(data.request);
    });

    channel.bind("request-accepted", (data: any) => {
      setRequestInfo(data.request);
    });

    channel.bind("request-rejected", (data: any) => {
      setRequestInfo(data.request);
    });

    return () => {
      pusherClient.unsubscribe(`user-${userId}`);
    };
  }, [userId, setRequestInfo]);
};
