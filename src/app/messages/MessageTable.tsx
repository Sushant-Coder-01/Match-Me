"use client";

import { MessageDto } from "@/types";
import {
  Avatar,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, useCallback, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteMessage } from "../actions/messageActions";
import { toast } from "react-toastify";
import { PiSpinnerGap } from "react-icons/pi";
import PresenceAvatar from "@/components/PresenceAvatar";

type Props = {
  messages: MessageDto[];
};

const outboxColumns = [
  { key: "recipientName", label: "Recipient" },
  { key: "text", label: "Message" },
  { key: "created", label: "Date Sent" },
  { key: "actions", label: "Actions" },
];

const inboxColumns = [
  { key: "senderName", label: "Sender" },
  { key: "text", label: "Message" },
  { key: "created", label: "Date Received" },
  { key: "actions", label: "Actions" },
];

const MessageTable = ({ messages }: Props) => {
  const searchParams = useSearchParams();
  const [isDeleting, setDeleting] = useState({ id: "", loading: false });
  const router = useRouter();

  const isOutbox = searchParams.get("container") === "outbox";

  const columns = isOutbox ? outboxColumns : inboxColumns;

  const handleDeleteMessage = async (message: MessageDto) => {
    setDeleting({ id: message.id, loading: true });

    try {
      await deleteMessage(message.id, isOutbox);
      router.refresh();
      toast.success("Message deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete message");
    } finally {
      setDeleting({ id: "", loading: false });
    }
  };

  const handleRowSelect = (key: Key) => {
    const message = messages.find((m) => m.id === key);
    const url = isOutbox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;
    router.push(url + "/chat");
  };

  const renderCell = useCallback(
    (item: MessageDto, columnKey: keyof MessageDto) => {
      const cellValue = item[columnKey];
      switch (columnKey) {
        case "recipientName":
        case "senderName":
          return (
            <div className="flex items-center gap-2 cursor-pointer">
              <PresenceAvatar
                userId={isOutbox ? item.recipientId : item.senderId}
                src={isOutbox ? item.recipientImage : item.senderImage}
              />
              <span>{cellValue}</span>
            </div>
          );
        case "text":
          return (
            <div>
              <p className="line-clamp-1">{item.text}</p>
            </div>
          );
        case "created":
          return cellValue;
        default:
          return (
            <div>
              <Button
                onClick={() => handleDeleteMessage(item)}
                isIconOnly
                variant="light"
                color="danger"
                isLoading={isDeleting.id === item.id && isDeleting.loading}
              >
                <AiFillDelete size={24} className="text-danger" />
              </Button>
            </div>
          );
      }
    },
    [isOutbox]
  );

  return (
    <Card>
      <Table
        aria-label="Table with messages"
        selectionMode="single"
        shadow="none"
        onRowAction={(key: Key) => handleRowSelect(key)}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              width={column.key === "text" ? "50%" : undefined}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={messages}
          emptyContent="No messages for this container"
        >
          {(item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer rounded-lg focus:ring-1 focus:ring-pink-300 active:bg-pink-500 transition duration-800 ease-in-out"
            >
              {(columnKey) => (
                <TableCell
                  className={!item.dateRead && !isOutbox ? "font-semibold" : ""}
                >
                  {renderCell(item, columnKey as keyof MessageDto)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default MessageTable;
