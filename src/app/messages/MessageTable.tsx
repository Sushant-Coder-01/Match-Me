"use client";

import { MessageDto } from "@/types";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Key } from "react";
import useMessages from "@/hooks/useMessages";
import MessageTableCell from "./MessageTableCell";

type Props = {
  messages: MessageDto[];
};

const MessageTable = ({ messages }: Props) => {
  const {
    columns,
    isOutbox,
    isDeleting,
    deleteMessage,
    selectRow,
    conversations,
  } = useMessages(messages);

  return (
    <Card>
      <Table
        aria-label="Table with messages"
        selectionMode="single"
        shadow="none"
        onRowAction={(key: Key) => selectRow(key)}
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
          items={conversations}
          emptyContent="No messages for this container"
        >
          {(item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer rounded-lg space focus:ring-1 focus:ring-pink-300 active:bg-pink-500 transition duration-800 ease-in-out"
            >
              {(columnKey) => (
                <TableCell
                  className={`${
                    !item.dateRead && !isOutbox ? "font-semibold" : ""
                  }`}
                >
                  <MessageTableCell
                    item={item}
                    columnKey={columnKey as string}
                    isOutbox={isOutbox}
                    deleteMessage={deleteMessage}
                    isDeleting={isDeleting.loading && isDeleting.id === item.id}
                  />
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
