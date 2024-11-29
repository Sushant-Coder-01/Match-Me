"use client";

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
};

const MemberSidebar = ({ member }: Props) => {
  const pathName = usePathname();
  const basePath = `/members/${member.userId}`;

  const navLinks = [
    { name: "Profile", href: `${basePath}` },
    { name: "Photos", href: `${basePath}/photos` },
    { name: "Chat", href: `${basePath}/chat` },
  ];

  return (
    // <div>
    //   <Card className="w-full mt-10 items-center h-[80vh]">
    //     <Image
    //       alt="User Profile Main Image"
    //       src={member.image || "/images/user.png"}
    //       width={200}
    //       height={200}
    //       className="rounded-full mt-6 aspect-square object-cover"
    //     />
    //     <CardBody>
    //       <div className="flex flex-col items-center">
    //         <div className="text-2xl">
    //           {member.name}, {calculateAge(member.dateOfBirth)}
    //         </div>
    //         <div className="text-sm text-neutral-500">
    //           {member.city}, {member.country}
    //         </div>
    //       </div>
    //       <Divider className="my-3" />
    //       <nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
    //         {navLinks.map((link) => (
    //           <Link
    //             key={link.name}
    //             href={link.href}
    //             className={`block rounded ${
    //               pathName === link.href
    //                 ? "text-default"
    //                 : "hover:text-default-500"
    //             }`}
    //           >
    //             {link.name}
    //           </Link>
    //         ))}
    //       </nav>
    //     </CardBody>

    //     <CardFooter>
    //       <Button
    //         as={Link}
    //         href="/members"
    //         fullWidth
    //         color="warning"
    //         variant="bordered"
    //       >
    //         Go Back
    //       </Button>
    //     </CardFooter>
    //   </Card>
    // </div>
    <div>
      <Card className="w-full mt-10 flex flex-col items-center justify-center h-[80vh] shadow-lg">
        <Image
          alt="User Profile Main Image"
          src={member.image || "/images/user.png"}
          width={200}
          height={200}
          className="rounded-full mt-6"
        />
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
          <nav className="flex flex-col p-4 text-lg gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block rounded-lg px-4 py-2 transition-all ${
                  pathName === link.href
                    ? "bg-pink-500 text-white"
                    : "hover:bg-neutral-100 hover:text-pink-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </CardBody>

        <CardFooter className="w-full flex justify-center mt-6">
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
