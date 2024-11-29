import { getMemberByUserId } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import MemberSidebar from "../MemberSidebar";
import { Card } from "@nextui-org/react";

type Props = {
  children: ReactNode;
  params: Promise<{ userId: string }>;
};

const Layout = async ({ children, params }: Props) => {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
      {/* Sidebar */}
      <div className="col-span-12 md:col-span-3 mb-5 md:mb-0">
        <MemberSidebar member={member} />
      </div>

      {/* Main Content */}
      <div className="col-span-12 md:col-span-9">
        <Card className="w-full mt-5 md:mt-10">{children}</Card>
      </div>
    </div>
  );
};

export default Layout;
