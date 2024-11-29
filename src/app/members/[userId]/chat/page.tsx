import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

const ChatPage = () => {
  return (
    <div>
      <Card className="h-[80vh]">
        <CardHeader className="text-2xl font-semibold text-default-foreground">
          Chat
        </CardHeader>
        <Divider />
        <CardBody>
            Chat goes here....!
        </CardBody>
      </Card>
    </div>
  );
};

export default ChatPage;
