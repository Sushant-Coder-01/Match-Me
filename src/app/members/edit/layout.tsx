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
    <div className="md:grid md:grid-cols-12 md:gap-5">
      <div className="md:col-span-3">
        <MemberSidebar member={member} navLinks={navLinks} />
      </div>
      <div className="md:col-span-9">
        <Card className="md:w-full md:mt-10">{children}</Card>
      </div>
    </div>
  );
};

export default layout;
