import PresenceAvatar from "@/components/PresenceAvatar";
import useMessageStore from "@/hooks/useMessageStore";
import { MessageDto } from "@/types";
import { Badge } from "@nextui-org/react";
import { FaChevronDown } from "react-icons/fa";
import { useShallow } from "zustand/react/shallow";

type Props = {
  item: MessageDto;
  columnKey: string;
  isOutbox: boolean;
  unreadUserCounts: object;
  deleteMessage: (message: MessageDto) => void;
  isDeleting: boolean;
};

const MessageTableCell = ({
  item,
  columnKey,
  isOutbox,
  unreadUserCounts,
  deleteMessage,
  isDeleting,
}: Props) => {
  const cellValue = item[columnKey as keyof MessageDto];

  const senderId = isOutbox ? item.recipientId : item.senderId;

  const count = unreadUserCounts[senderId];

  console.log("unreadSenderIds: ", unreadUserCounts);

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
        <div className="flex flex-row">
          <p className="line-clamp-1">{item.text}</p>
          {count !== 0 && !isOutbox && (
            <div className="bg-danger rounded-full w-5 absolute right-0 text-center">
              <span className="text-white">{count}</span>
            </div>
          )}
        </div>
      );
    case "created":
      return cellValue;
    default:
      return (
        <div>
          {/* <Button
                onClick={() => handleDeleteMessage(item)}
                isIconOnly
                variant="light"
                color="danger"
                isLoading={isDeleting.id === item.id && isDeleting.loading}
              >
                <AiFillDelete size={24} className="text-danger" />
              </Button> */}
          <FaChevronDown size={15} />
        </div>
      );
  }
};

export default MessageTableCell;
