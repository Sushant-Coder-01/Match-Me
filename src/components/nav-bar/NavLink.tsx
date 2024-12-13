"use client";

import useMessageStore from "@/hooks/useMessageStore";
import { Badge, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

type Props = { href: string; label: string };

const NavLink = ({ href, label }: Props) => {
  const pathname = usePathname();

  const { unreadCount } = useMessageStore(
    useShallow((state) => ({ unreadCount: state.unreadCount }))
  );

  return (
    <div>
      <NavbarItem isActive={pathname === href} as={Link} href={href}>
        <span>{label}</span>
        {href === "/messages" && (
          <span className="absolute top-0 ml-3 mb-3 ">
            {unreadCount !== 0 && (
              <Badge content={unreadCount} color="danger" variant="shadow">
                <></>
              </Badge>
            )}
          </span>
        )}
      </NavbarItem>
    </div>
  );
};

export default NavLink;
