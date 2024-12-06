import usePresenceStore from "@/hooks/usePresenceStore";
import { Member } from "@prisma/client";
import { GoDot, GoDotFill } from "react-icons/go";
import { useShallow } from "zustand/react/shallow";

type Props = {
  member: Member;
};

const PresenceDot = ({ member }: Props) => {
  const { memberId } = usePresenceStore(
    useShallow((state) => ({ memberId: state.memberId }))
  );

  const isOnline = memberId.indexOf(member.userId) !== -1;

  if (!isOnline) return null;

  return (
    <div>
      <GoDot size={28} className="fill-white absolute"/>
      <GoDotFill size={28} className="fill-green-500 animate-pulse" />
    </div>
  );
};

export default PresenceDot;
