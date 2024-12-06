import usePresenceStore from "@/hooks/usePresenceStore";
import { Avatar, Badge } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useShallow } from "zustand/react/shallow";

type Props = {
  userId?: string;
  src?: string | null;
};

const PresenceAvatar = ({ userId, src }: Props) => {
  const { data: session } = useSession();
  const { memberId } = usePresenceStore(
    useShallow((state) => ({
      memberId: state.memberId,
    }))
  );

  const isOnline = userId && memberId.indexOf(userId) !== -1;

  return (
    <div>
      {userId !== session?.user?.id ? (
        <Badge
          shape="circle"
          isInvisible={!isOnline}
          color="success"
          content=""
          size="sm"
        >
          <Avatar src={src || "/images/user.png"} alt="user avatar" />
        </Badge>
      ) : (
        <Avatar src={src || "/images/user.png"} alt="user avatar" />
      )}
    </div>
  );
};

export default PresenceAvatar;
