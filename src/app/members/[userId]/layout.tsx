import { getMemberByUserId } from "@/app/actions/memberActions";
import { notFound, usePathname } from "next/navigation";
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

  const basePath = `/members/${member.userId}`;

  if (!member) return notFound();

  const navLinks = [
    { name: "Profile", href: `${basePath}` },
    { name: "Photos", href: `${basePath}/photos` },
    { name: "Chat", href: `${basePath}/chat` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
      {/* Sidebar */}
      <div className="col-span-12 md:col-span-3 md:mb-0">
        <MemberSidebar member={member} navLinks={navLinks} />
      </div>

      {/* Main Content */}
      <div className="hidden md:block col-span-12 md:col-span-9">
        <Card className="w-full mt-5 md:mt-10">{children}</Card>
      </div>
    </div>
  );
};

export default Layout;
