import { MessageDto } from "@/types";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { toast } from "react-toastify";

type Props = {
  image?: string | null;
  href: string;
  title: string;
  subtitle?: string;
};

const NotificationToast = ({ image, href, title, subtitle }: Props) => {
  return (
    <div>
      <Link href={href} className="flex items-center gap-2">
        <div className="mr-2">
          <Image
            src={image || "images/user.png"}
            height={50}
            width={50}
            alt="sender image"
          />
        </div>
        <div className="flex flex-grow flex-col justify-center">
          <div className="font-semibold">{title}</div>
          <div className="text-sm">{subtitle || "Click to view"}</div>
        </div>
      </Link>
    </div>
  );
};

export const newMessageToast = (message: MessageDto) => {
  toast(
    <NotificationToast
      image={message.senderImage}
      href={`/members/${message.senderId}/chat`}
      title={`${message.senderName} has sent you a new message`}
    />
  );
};

export const newLikeToast = (
  name: string,
  image: string | null,
  userId: string
) => {
  toast(
    <NotificationToast
      image={image}
      href={`/members/${userId}`}
      title={`You have been liked by ${name}`}
      subtitle="Click here to view their profile"
    />
  );
};

export default NotificationToast;
