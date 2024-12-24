import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import { useRequestStore } from "./useRequestStore";
import { sendResponse } from "@/types";

type Data = {
  request : sendResponse
}

export const usePusherRequests = (userId: string | undefined) => {
  const { setRequestInfo } = useRequestStore();

  useEffect(() => {
    if (!userId) return;

    const channel = pusherClient.subscribe(`user-${userId}`);

    channel.bind("new-request", (data: Data) => {
      setRequestInfo(data.request);
    });

    channel.bind("request-accepted", (data: Data) => {
      setRequestInfo(data.request);
    });

    channel.bind("request-rejected", (data: Data) => {
      setRequestInfo(data.request);
    });

    return () => {
      pusherClient.unsubscribe(`user-${userId}`);
    };
  }, [userId, setRequestInfo]);
};
