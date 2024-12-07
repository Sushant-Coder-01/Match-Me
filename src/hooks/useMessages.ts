import { deleteMessage } from "@/app/actions/messageActions";
import { MessageDto } from "@/types";
import { useSearchParams } from "next/navigation";
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
  const { set, remove, messages, updateUnreadCount } = useMessageStore(
    useShallow((state) => ({
      set: state.set,
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
    set(initialMessages);

    return () => set([]);
  }, [initialMessages, set]);

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
      } finally {
        setDeleting({ id: "", loading: false });
      }
    },
    [isOutbox, remove, updateUnreadCount]
  );

  const handleRowSelect = (key: Key) => {
    const message = messages.find((m) => m.id === key);
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
    deleteMessage: handleDeleteMessage,
    selectRow: handleRowSelect,
  };
};

export default useMessages;
