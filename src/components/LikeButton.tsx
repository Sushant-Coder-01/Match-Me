"use client";

import { toggleLikeMember } from "@/app/actions/likeActions";
import { useRouter } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  targetId: string;
  hasLiked: boolean;
};

const LikeButton = ({ targetId, hasLiked }: Props) => {
  const router = useRouter();
  const toggleLike = async () => {
    await toggleLikeMember(targetId, hasLiked);
    router.refresh();
  };
  return (
    <div
      onClick={toggleLike}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart size={28} className="fill-white absolute" />
      <AiFillHeart
        size={28}
        className={hasLiked ? "fill-rose-500" : "fill-neutral-500"}
      />
    </div>
  );
};

export default LikeButton;
