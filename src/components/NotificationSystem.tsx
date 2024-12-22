import { useEffect } from "react";
import Pusher from "pusher-js";
import { toast } from "react-toastify";
import { pusherClient } from "@/lib/pusher";
import { sendResponse } from "@/types";

type Props = {
  userId: string;
};

const NotificationSystem = ({ userId }: Props) => {
  useEffect(() => {
    const channel = pusherClient.subscribe(`user-${userId}`);
    channel.bind("new-request", (data: sendResponse) => {
      toast.info(`New request from user ${data.senderId}`);
    });

    channel.bind("request-accepted", (data: sendResponse) => {
      toast.success("Your request was accepted!");
    });

    return () => {
      pusherClient.unsubscribe(`user-${userId}`);
    };
  }, [userId]);

  return null;
};

export default NotificationSystem;
