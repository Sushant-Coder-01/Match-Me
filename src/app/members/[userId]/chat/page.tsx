import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import ChatForm from "./ChatForm";
import MessageBox from "./MessageBox";
import { getMessageThread } from "@/app/actions/messageActions";
import { getAuthUserId } from "@/app/actions/authActions";

type Props = {
  params: Promise<{ userId: string }>;
};

const ChatPage = async ({ params }: Props) => {
  const { userId: threadUserId } = await params;
  const messages = await getMessageThread(threadUserId);
  const currentUserId = await getAuthUserId();

  return (
    <div>
      <Card className="h-[80vh] w-full">
        <CardHeader className="text-2xl font-semibold text-default-foreground">
          Chat
        </CardHeader>
        <Divider />
        <CardBody>
          {messages.length === 0 ? (
            <div>No messages to display</div>
          ) : (
            <div>
              {messages.map((message) => (
                <MessageBox
                  key={message.id}
                  message={message}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          )}
        </CardBody>
        <div className="p-5">
          <ChatForm />
        </div>
      </Card>
    </div>
  );
};

export default ChatPage;
