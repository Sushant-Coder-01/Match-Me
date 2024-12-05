"use client";

import LikeButton from "@/components/LikeButton";
import { calculateAge } from "@/lib/util";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Member } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { MouseEvent } from "react";

type Props = {
  member: Member;
  likeIds: string[];
};

const MemberCard = ({ member, likeIds }: Props) => {
  const hasLiked = likeIds.includes(member.userId);

  const preventLinkAction = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card fullWidth as={Link} href={`/members/${member.userId}`} isPressable>
      <div onClick={preventLinkAction}>
        <div className="absolute top-3 right-3 z-50">
          <LikeButton targetId={member.userId} hasLiked={hasLiked} />
        </div>
      </div>
      <CardBody>
        <Image
          alt={member.name}
          src={member.image || "/images/user.png"}
          width={300}
          height={300}
          className="aspect-square object-cover scale-100 hover:scale-105 transition-transform"
          priority
        ></Image>
      </CardBody>

      <CardFooter className="flex justify-start overflow-hidden absolute bottom-0 z-10 bg-gradient-to-t from-black">
        <div className="flex flex-col text-white">
          <div className="font-semibold flex gap-2">
            <span className="text-sm md:text-xl line-clamp-1">
              {member.name},
            </span>
            <span className="text-sm md:text-xl">
              {calculateAge(member.dateOfBirth)}
            </span>
          </div>
          <span className="text-xs md:text-sm">{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
