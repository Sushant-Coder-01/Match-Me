import { Button } from "@nextui-org/react";
import { useRequestStore } from "@/hooks/useRequestStore";
import { useSession } from "next-auth/react";
import { usePusherRequests } from "@/hooks/usePusherRequests";
import { useEffect, useState } from "react";

type Props = {
  senderId: string | undefined;
  receiverId: string;
};

const SendRequestButton = ({ senderId, receiverId }: Props) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  if (!senderId) throw new Error("SenderId is not found!");

  // Use Pusher for real-time updates
  usePusherRequests(userId);

  // Access request state and actions
  const {
    requestInfo,
    sendRequest,
    acceptRequest,
    rejectRequest,
    fetchRequestInfo,
  } = useRequestStore();

  // Determine if the current user is the sender or receiver
  const isSender = userId === requestInfo?.senderId;
  const isReceiver = userId === requestInfo?.receiverId;

  // Handler for sending a new request
  const handleSendRequest = async () => {
    await sendRequest(senderId, receiverId);
  };

  // Handlers for receiver actions
  const handleAcceptRequest = async () => {
    if (requestInfo?.id) {
      await acceptRequest(requestInfo.id);
    }
  };

  const handleRejectRequest = async () => {
    if (requestInfo?.id) {
      await rejectRequest(requestInfo.id);
    }
  };

  // Render logic based on request status
  if (requestInfo) {
    if (isSender) {
      return (
        <Button disabled className="px-4 py-2 rounded bg-gray-500 text-white mt-4">
          {requestInfo.status === "PENDING"
            ? "Request Sent"
            : requestInfo.status === "ACCEPTED"
              ? "Request Accepted"
              : "Request Rejected"}
        </Button>
      );
    }

    if (isReceiver) {
      if (requestInfo.status === "PENDING") {
        return (
          <div className="flex space-x-2 mt-4">
            <Button
              className=" px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              onPress={handleAcceptRequest}
            >
              Accept
            </Button>
            <Button
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              onPress={handleRejectRequest}
            >
              Reject
            </Button>
          </div>
        );
      }

      return (
        <Button disabled className="mt-4 px-4 py-2 rounded bg-gray-500 text-white">
          {requestInfo.status === "ACCEPTED"
            ? "Request Accepted"
            : "Request Rejected"}
        </Button>
      );
    }
  }

  // Default state for users not involved in the request
  return (
    <Button
      className={`mt-4 px-4 py-2 rounded bg-pink-500 text-white hover:bg-pink-600`}
      onPress={handleSendRequest}
    >
      Send Request
    </Button>
  );
};

export default SendRequestButton;
