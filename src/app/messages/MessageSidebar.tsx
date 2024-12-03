"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdOutlineOutbox } from "react-icons/md";
import { GoInbox } from "react-icons/go";
import { Button, Chip } from "@nextui-org/react";

const MessageSidebar = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [selected, setSelected] = useState<string>(
    searchParams.get("container") || "inbox"
  );

  const items = [
    { key: "inbox", label: "inbox", icon: GoInbox, chip: true },
    { key: "outbox", label: "outbox", icon: MdOutlineOutbox, chip: false },
  ];

  const handleSelect = (key: string) => {
    setSelected(key);
    const params = new URLSearchParams();
    params.set("container", key);
    router.replace(`${pathName}?${params}`);
  };

  return (
    <div className="flex flex-col space-y-2">
      {items.map(({ key, label, icon: Icon, chip }) => (
        <Button
          key={key}
          className={` flex flex-row item-center rounded-lg gap-2 p-3 ${
            selected === key
              ? "text-default-foreground font-semibold bg-pink-400"
              : "text-black hover:text-pink-500"
          } `}
          onClick={() => handleSelect(key)}
        >
          <Icon size={24} />
          <div className="flex justify-between flex-grow">
            <span>{label}</span>
            {chip && <Chip color="danger">2</Chip>}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default MessageSidebar;
