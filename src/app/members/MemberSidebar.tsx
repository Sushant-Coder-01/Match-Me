"use client";

import PresenceDot from "@/components/PresenceDot";
import { calculateAge } from "@/lib/util";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  member: Member;
  navLinks: { name: string; href: string }[];
};

const MemberSidebar = ({ member, navLinks }: Props) => {
  const pathName = usePathname();

  return (
    <div>
      <Card className="w-full md:mt-10 flex flex-col items-center justify-center h-[90vh]  md:h-[80vh] ">
        <div className="relative rounded-full mt-6">
          <div>
            <Image
              alt="User Profile Main Image"
              src={member.image || "/images/user.png"}
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute top-5 right-5 z-50">
            <PresenceDot member={member} />
          </div>
        </div>

        <CardBody>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-default-foreground mb-2">
              {member.name}, {calculateAge(member.dateOfBirth)}
            </div>
            <div className="text-sm text-neutral-600">
              {member.city}, {member.country}
            </div>
          </div>
          <Divider className="my-4" />
          <nav className="flex flex-col justify-center p-4 text-lg md:gap-y-3">
            {navLinks.map((link) => (
              <Button
                as={Link}
                key={link.name}
                href={link.href}
                className={`flex justify-start rounded-lg px-4 py-2 text-lg  transition-all ${
                  pathName === link.href
                    ? "bg-pink-500 text-white"
                    : "bg-white hover:bg-neutral-200 hover:text-pink-500"
                }`}
              >
                {link.name}
              </Button>
            ))}
          </nav>
        </CardBody>

        <CardFooter className="w-full flex justify-center md:mt-6">
          <Button
            as={Link}
            href="/members"
            fullWidth
            className="mt-4 py-2 px-6 mx-4 bg-white text-lg font-semibold rounded-lg border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition"
          >
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MemberSidebar;
