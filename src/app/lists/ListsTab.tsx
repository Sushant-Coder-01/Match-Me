"use client";

import { Button, Tab, Tabs } from "@nextui-org/react";
import { Member } from "@prisma/client";
import MemberCard from "../members/MemberCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Key, useTransition } from "react";
import Loading from "../members/[userId]/loading";
import { FaUserAltSlash } from "react-icons/fa";
import { BiSmile } from "react-icons/bi";
import Link from "next/link";

type Props = {
  members: Member[];
  likeIds: string[];
};

const ListsTab = ({ members, likeIds }: Props) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const tabs = [
    { id: "source", label: "Members I have liked" },
    { id: "target", label: "Members that liked me" },
    { id: "mutual", label: "Mutual likes" },
  ];

  const handleTabChange = (key: Key) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("type", key.toString());
      router.replace(`${pathName}?${params.toString()}`);
    });
  };

  return (
    <div className="flex w-full flex-col gap-5 mt-10">
      <Tabs
        aria-label="Like Tabs"
        color="default"
        items={tabs}
        onSelectionChange={(key) => handleTabChange(key)}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {isPending ? (
              <Loading />
            ) : (
              <>
                {members.length > 0 ? (
                  <div className="m-3 md:m-0  md:mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-8">
                    {members.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        likeIds={likeIds}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10">
                    <FaUserAltSlash className="text-gray-400 text-8xl" />
                    <p className="mt-4 text-xl font-semibold text-gray-700">
                      Whoops, nobody&apos;s here!
                    </p>
                    <p className="text-md text-gray-500 mt-1 flex items-center gap-2">
                      Let&apos;s find someone cool!{" "}
                      <BiSmile color="orange" size={25} />
                    </p>
                    <Button
                      as={Link}
                      href="/members"
                      color="warning"
                      variant="bordered"
                      size="md"
                      className="my-5"
                    >
                      Explore Members
                    </Button>
                  </div>
                )}
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default ListsTab;
