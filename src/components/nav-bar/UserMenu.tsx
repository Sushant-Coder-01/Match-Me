import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  user: Session["user"];
};

const UserMenu = ({ user }: Props) => {

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
            isReadOnly
            as="span"
            className="h-12 flex flex-row"
            aria-label="username"
          >
            <span className="font-semibold text-gray-600">Logged In As: </span>
            <span className="text-orange-400 font-bold">"{user?.name}"</span>
          </DropdownItem>
        </DropdownSection>
        <DropdownItem as={Link} href="/members/edit">
          Edit Profile
        </DropdownItem>
        <DropdownSection className="sm:hidden">
          <DropdownItem as={Link} href="/members">
            Matches
          </DropdownItem>
          <DropdownItem as={Link} href="/lists">
            Lists
          </DropdownItem>
          <DropdownItem as={Link} href="/messages">
            Messages
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          color="danger"
          onClick={async () => {
            await signOut({ callbackUrl: "/login" });
            // signOutUser();
            // router.push("/");
            // router.refresh();
          }}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
