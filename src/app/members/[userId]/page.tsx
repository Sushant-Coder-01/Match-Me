import { getMemberByUserId } from "@/app/actions/memberActions";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ userId: string }>;
};

const MemberDetailedPage = async ({ params }: Props) => {
  const { userId } = await params;

  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <div>
      <Card className="h-[80vh]">
        <CardHeader className="text-2xl font-semibold text-default">
          Profile
        </CardHeader>
        <Divider />
        <CardBody>{member.description}</CardBody>
      </Card>
    </div>
  );
};

export default MemberDetailedPage;
