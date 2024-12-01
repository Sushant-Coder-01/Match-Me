import { ReactNode } from "react";
import MemberSidebar from "../MemberSidebar";
import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";
import { Card } from "@nextui-org/react";

type Props = {
  children: ReactNode;
};

const layout = async ({ children }: Props) => {
  const userId = await getAuthUserId();

  const member = await getMemberByUserId(userId);

  const basePath = `/members/edit`;

  const navLinks = [
    { name: "Edit Profile", href: `${basePath}` },
    {
      name: "Update Photos",
      href: `${basePath}/photos`,
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-3">
        <MemberSidebar member={member} navLinks={navLinks} />
      </div>
      <div className="col-span-9">
        <Card className="w-full mt-10">{children}</Card>
      </div>
    </div>
  );
};

export default layout;
