"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  user: {
    name?: string | null;
    image?: string | null;
    profileComplete?: boolean;
  };
};

const UserMenu = ({ user }: Props) => {
  const router = useRouter();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform w-10 h-10"
          color="default"
          name={user?.name || "user avatar"}
          size="sm"
          src={user?.image || "/images/user.png"}
        />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection showDivider>
          <DropdownItem
            key="name"
            isReadOnly
            as="span"
            className="h-12 flex flex-row"
            aria-label="username"
          >
            <span className="font-semibold text-gray-600">Logged In As: </span>
            <span className="text-orange-400 font-bold">
              &quot;{user?.name}&quot;
            </span>
          </DropdownItem>
        </DropdownSection>
        <DropdownItem key="editProfile" as={Link} href="/members/edit">
          Edit Profile
        </DropdownItem>
        <DropdownSection className="sm:hidden">
          <DropdownItem key="matches" as={Link} href="/members">
            Matches
          </DropdownItem>
          <DropdownItem key="lists" as={Link} href="/lists">
            Lists
          </DropdownItem>
          <DropdownItem
            key="messages"
            as={Link}
            href="/messages"
            className="relative"
          >
            Messages
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          key="login"
          color="danger"
          onPress={async () => {
            // signOutUser();
            await signOut({ redirectTo: "/login" });
            router.push("/login");
            router.refresh();
          }}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
