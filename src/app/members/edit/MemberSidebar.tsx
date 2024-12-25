"use client";

import PresenceDot from "@/components/PresenceDot";
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
import { Member } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PiUserListFill } from "react-icons/pi";

type Props = {
  member: Member | null | undefined;
  navLinks: { name: string; href: string }[];
};

const MemberSidebar = ({ member, navLinks }: Props) => {
  const pathName = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(false);
  };

  return (
    <div className="relative">
      <div className="hidden relative md:block">
        <Card className="w-full h-full md:mt-10 flex flex-col items-center justify-center  md:h-[80vh] ">
          <div className="relative rounded-full mt-6">
            <div>
              <Image
                alt="User Profile Main Image"
                src={member?.image || USER_DEFAULT_IMAGE}
                width={200}
                height={200}
                className="aspect-square object-cover rounded-full"
              />
            </div>
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
                  {member?.name}, {calculateAge(member.dateOfBirth)}
                </div>
                <div className="text-sm text-neutral-600">
                  {member?.city}, {member?.country}
                </div>
              </div>
            )}
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

      {/* Mobile Filter Icon */}
      <div className="block md:hidden fixed bottom-4 right-4 z-50">
        <Button
          isIconOnly
          size="lg"
          color="primary"
          onPress={() => {
            setOpenMenu(!openMenu);
          }}
          aria-label="Open Filters"
        >
          <PiUserListFill
            size={30}
            className={`${openMenu ? "text-pink-500" : "text-white"}`}
          />
        </Button>
      </div>

      {openMenu && (
        <div className="block absolute z-50 w-full md:hidden">
          <Card className="w-full h-full md:mt-10 flex flex-col items-center justify-center md:h-[80vh] ">
            <div className="relative rounded-full mt-6">
              <div>
                <Image
                  alt="User Profile Main Image"
                  src={member?.image || USER_DEFAULT_IMAGE}
                  width={200}
                  height={200}
                  className="aspect-square object-cover rounded-full"
                />
              </div>
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
                    {member?.name}, {calculateAge(member.dateOfBirth)}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {member?.city}, {member?.country}
                  </div>
                </div>
              )}
              <Divider className="my-4" />
              <nav className="flex flex-col justify-center p-4 text-lg md:gap-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex justify-start rounded-lg px-4 py-2 text-lg  transition-all ${
                      pathName === link.href
                        ? "bg-pink-500 text-white"
                        : "bg-white hover:bg-neutral-200 hover:text-pink-500"
                    }`}
                    onClick={handleOpenMenu}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
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
