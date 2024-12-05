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
import MessageList from "./MessageList";
import { createChatId } from "@/lib/util";

type Props = {
  params: Promise<{ userId: string }>;
};

const ChatPage = async ({ params }: Props) => {
  const { userId: threadUserId } = await params;
  const messages = await getMessageThread(threadUserId);
  const currentUserId = await getAuthUserId();

  const chatId = createChatId(currentUserId, threadUserId);


  return (
    <div>
      <Card className="h-[80vh] w-full">
        <CardHeader className="text-2xl font-semibold text-default-foreground">
          Chat
        </CardHeader>
        <Divider />
        <CardBody>
          <MessageList
            initialMessages={messages}
            currentUserId={currentUserId}
            chatId={chatId}
          />
        </CardBody>
        <div className="p-5">
          <ChatForm />
        </div>
      </Card>
    </div>
  );
};

export default ChatPage;
