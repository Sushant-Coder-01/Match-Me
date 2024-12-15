import { deleteMessage } from "@/app/actions/messageActions";
import { MessageDto } from "@/types";
import { notFound, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Key, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useMessageStore from "./useMessageStore";
import { useShallow } from "zustand/react/shallow";

const outboxColumns = [
  { key: "recipientName", label: "Recipient" },
  { key: "text", label: "Message" },
  { key: "created", label: "Date Sent" },
  { key: "actions", label: "" },
];

const inboxColumns = [
  { key: "senderName", label: "Sender" },
  { key: "text", label: "Message" },
  { key: "created", label: "Date Received" },
  { key: "actions", label: "" },
];

const useMessages = (initialMessages: MessageDto[]) => {
  const { setMessages, remove, updateUnreadCount } = useMessageStore(
    useShallow((state) => ({
      setMessages: state.setMessages,
      remove: state.remove,
      messages: state.messages,
      updateUnreadCount: state.updateUnreadCount,
    }))
  );

  const searchParams = useSearchParams();
  const [isDeleting, setDeleting] = useState({ id: "", loading: false });
  const router = useRouter();

  const isOutbox = searchParams.get("container") === "outbox";

  useEffect(() => {
    setMessages(initialMessages);
    return () => setMessages([]);
  }, [initialMessages, setMessages]);

  const columns = isOutbox ? outboxColumns : inboxColumns;

  const latestMessages = initialMessages.reduce((result, message) => {
    const key = isOutbox ? message.recipientId : message.senderId;

    if (
      !result[key] ||
      new Date(message.created) > new Date(result[key].created)
    ) {
      result[key] = message;
    }

    return result;
  }, {} as Record<string, MessageDto>);

  const conversations = Object.values(latestMessages);

  const unreadUserCounts = initialMessages.reduce((result, message) => {
    if (!message.dateRead) {
      const key = isOutbox ? message.recipientId : message.senderId;
      result[key] = (result[key] || 0) + 1;
    }
    return result;
  }, {} as Record<string, number>);

  const handleDeleteMessage = useCallback(
    async (message: MessageDto) => {
      setDeleting({ id: message.id, loading: true });

      try {
        await deleteMessage(message.id, isOutbox);
        remove(message.id);
        if (!message.dateRead && !isOutbox) updateUnreadCount(-1);
        router.refresh();
        toast.success("Message deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete message");
        console.error(error);
      } finally {
        setDeleting({ id: "", loading: false });
      }
    },
    [isOutbox, remove, updateUnreadCount, router]
  );

  const handleRowSelect = (key: Key) => {
    const message = conversations.find((m) => m.id === key);

    if (!message) return;

    const url = isOutbox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;
    router.push(url + "/chat");
  };

  return {
    isOutbox,
    columns,
    isDeleting,
    conversations,
    unreadUserCounts,
    deleteMessage: handleDeleteMessage,
    selectRow: handleRowSelect,
  };
};

export default useMessages;
