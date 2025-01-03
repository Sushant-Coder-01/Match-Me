import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import EditForm from "./EditForm";
import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";

const page = async () => {
  const userId = await getAuthUserId();

  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <div>
      <Card className="md:h-[80vh]">
        <CardHeader className="text-2xl font-semibold text-default-foreground">
          Edit Profile
        </CardHeader>
        <Divider />
        <CardBody>
          <EditForm member={member} />
        </CardBody>
      </Card>
    </div>
  );
};

export default page;
