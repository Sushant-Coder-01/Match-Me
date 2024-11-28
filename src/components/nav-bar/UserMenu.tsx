import { signOutUser } from "@/app/actions/authActions";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  user: Session["user"];
};

const UserMenu = ({ user }: Props) => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
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
            Signed in as {user?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem as={Link} href="/members/edit">
          Edit Profile
        </DropdownItem>
        <DropdownSection className="sm:hidden">
          <DropdownItem>Matches</DropdownItem>
          <DropdownItem>Lists</DropdownItem>
          <DropdownItem>Messages</DropdownItem>
        </DropdownSection>
        <DropdownItem
          color="danger"
          onClick={async () => {
            signOut({ callbackUrl: "/login"});
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
