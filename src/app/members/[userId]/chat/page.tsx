import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import { getAuthUserId } from "@/app/actions/authActions";
import MessageList from "./MessageList";
import { createChatId } from "@/lib/util";
import { getMemberByUserId } from "@/app/actions/memberActions";

type Props = {
  params: Promise<{ userId: string }>;
};

const ChatPage = async ({ params }: Props) => {
  const { userId: threadUserId } = await params;
  const messageThreads = await getMessageThread(threadUserId);
  const currentUserId = await getAuthUserId();
  const threaduser = await getMemberByUserId(threadUserId);
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
            initialMessages={messageThreads}
            currentUserId={currentUserId}
            chatId={chatId}
            threadUser={threaduser}
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
