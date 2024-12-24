"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { pusherClient } from "@/lib/pusher";
import { sendResponse } from "@/types";

type Props = {
  userId: string;
};

const NotificationSystem = ({ userId }: Props) => {
  useEffect(() => {
    if (!userId) {
      console.error("Invalid userId for Pusher subscription.");
      return;
    }

    const channel = pusherClient.subscribe(`user-${userId}`);
    channel.bind("new-request", (data: sendResponse) => {
      if (!data.senderId) {
        console.error("Invalid data received in 'new-request' event.");
        return;
      }
      toast.info(`New request from user ${data.senderId}`);
    });

    channel.bind("request-accepted", () => {
      toast.success("Your request was accepted!");
    });

    return () => {
      pusherClient.unsubscribe(`user-${userId}`);
    };
  }, [userId]);

  return null;
};

export default NotificationSystem;
