import PresenceAvatar from "@/components/PresenceAvatar";
import { MessageDto } from "@/types";
import { FaChevronDown } from "react-icons/fa";

type Props = {
  item: MessageDto;
  columnKey: string;
  isOutbox: boolean;
  deleteMessage: (message: MessageDto) => void;
  isDeleting: boolean;
};

const MessageTableCell = ({
  item,
  columnKey,
  isOutbox,
  deleteMessage,
  isDeleting,
}: Props) => {
  const cellValue = item[columnKey as keyof MessageDto];
  
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
