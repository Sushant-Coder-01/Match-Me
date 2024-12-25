"use client";

import PresenceDot from "@/components/PresenceDot";
import SendRequestButton from "@/components/SendRequestButton";
import { useRequestStore } from "@/hooks/useRequestStore";
import { USER_DEFAULT_IMAGE } from "@/lib/constant";
import { calculateAge } from "@/lib/util";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { Member, RequestStatus } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PiUserListFill } from "react-icons/pi";

type Props = {
  member: Member | null | undefined;
  userId?: string;
  navLinks: { name: string; href: string }[];
};

const MemberSidebar = ({ member, userId, navLinks }: Props) => {
  const pathName = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const { requestInfo, fetchRequestInfo } = useRequestStore();

  useEffect(() => {
    if (userId && member?.userId) {
      const [firstId, secondId] =
        userId < member.userId
          ? [userId, member.userId]
          : [member.userId, userId];

      fetchRequestInfo(firstId, secondId);
    }
  }, [userId, member?.userId, fetchRequestInfo]);

  const renderNavLinks = () => {
    return navLinks
      .filter((link) => {
        if (!requestInfo || requestInfo.status !== RequestStatus.ACCEPTED) {
          return link?.name === "Profile";
        }
        return true;
      })
      .map((link) => (
        <Link
          key={link?.name}
          href={link?.href}
          onClick={() => setOpenMenu(!openMenu)}
          className={`flex justify-start rounded-lg px-4 py-2 text-lg transition-all ${
            pathName === link?.href
              ? "bg-pink-500 text-white"
              : "bg-white hover:bg-neutral-200 hover:text-pink-500"
          }`}
        >
          {link?.name}
        </Link>
      ));
  };

  return (
    <div className="relative">
      <div className="hidden md:block">
        <Card className="w-full h-full mt-10 flex flex-col items-center justify-center">
          <div className="relative rounded-full mt-6">
            <Image
              alt="User Profile Main Image"
              src={member?.image || USER_DEFAULT_IMAGE}
              width={200}
              height={200}
              className="aspect-square object-cover rounded-full"
            />
            {member && (
              <div className="absolute top-4 right-3 z-50">
                <PresenceDot member={member} />
              </div>
            )}
          </div>

          <CardBody>
            {member && (
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-default-foreground mb-2">
                  {member.name}, {calculateAge(member.dateOfBirth)}
                </div>
                <div className="text-sm text-neutral-600">
                  {member.city}, {member.country}
                </div>
                <div className="mt-4">
                  <SendRequestButton
                    senderId={userId}
                    receiverId={member.userId}
                  />
                </div>
              </div>
            )}
            {navLinks.length > 0 && (
              <>
                <Divider className="my-4" />
                <nav className="flex flex-col justify-center p-4 text-lg md:gap-y-3">
                  {renderNavLinks()}
                </nav>
              </>
            )}
          </CardBody>

          <CardFooter className="w-full flex justify-center mt-6">
            <Button
              as={Link}
              href="/members"
              fullWidth
              className="py-2 px-6 mx-4 bg-white text-lg font-semibold rounded-lg border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition"
            >
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Mobile Menu */}
      <div className="block md:hidden fixed bottom-4 right-4 z-50">
        <Button
          isIconOnly
          size="lg"
          color="primary"
          onPress={() => setOpenMenu(!openMenu)}
          aria-label="Open Filters"
        >
          <PiUserListFill
            size={30}
            className={`${openMenu ? "text-pink-500" : "text-white"}`}
          />
        </Button>
      </div>

      {openMenu && (
        <div className="absolute z-50 w-full block md:hidden">
          <Card className="flex flex-col items-center justify-center">
            <div className="relative rounded-full mt-6">
              <Image
                alt="User Profile Main Image"
                src={member?.image || USER_DEFAULT_IMAGE}
                width={200}
                height={200}
                className="aspect-square object-cover rounded-full"
              />
              {member && (
                <div className="absolute top-4 right-3 z-50">
                  <PresenceDot member={member} />
                </div>
              )}
            </div>

            <CardBody>
              {member && (
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-default-foreground mb-2">
                    {member.name}, {calculateAge(member.dateOfBirth)}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {member.city}, {member.country}
                  </div>
                  <SendRequestButton
                    senderId={userId}
                    receiverId={member.userId}
                  />
                </div>
              )}
              {navLinks.length > 0 && (
                <>
                  <Divider className="my-4" />
                  <nav className="flex flex-col justify-center p-4 text-lg md:gap-y-3">
                    {renderNavLinks()}
                  </nav>
                </>
              )}
            </CardBody>

            <CardFooter className="w-full flex justify-center mb-10">
              <Button
                as={Link}
                href="/members"
                fullWidth
                className="py-2 px-6 mx-4 bg-white text-lg font-semibold rounded-lg border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition"
              >
                Go Back
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MemberSidebar;
