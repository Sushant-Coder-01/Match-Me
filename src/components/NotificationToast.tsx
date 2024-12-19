import { USER_DEFAULT_IMAGE } from "@/lib/constant";
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

const NotificationToast = ({ image, href, title }: Props) => {
  return (
    <div>
      <Link href={href} className="flex items-center gap-2">
        <div className="mr-2">
          <Image
            src={image || USER_DEFAULT_IMAGE}
            height={50}
            width={50}
            alt="sender image"
            className="border-1 border-pink-500 shadow-2xl rounded-full"
          />
        </div>
        <div className="flex flex-grow flex-col justify-center">
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-pink-500">&quot;Click to view&quot;</div>
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
      title={`${message.senderName} messaged you!`}
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
      title={`${name} likes you!`}
    />
  );
};

export default NotificationToast;
