import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import { getAuthUserId } from "@/app/actions/authActions";
import MessageList from "./MessageList";
import { createChatId } from "@/lib/util";
import { getMemberByUserId } from "@/app/actions/memberActions";
import PresenceAvatar from "@/components/PresenceAvatar";

type Props = {
  params: Promise<{ userId: string }>;
};

const ChatPage = async ({ params }: Props) => {
  const { userId: threadUserId } = await params;
  const messageThreads = await getMessageThread(threadUserId);
  const currentUserId = await getAuthUserId();
  const threaduser = await getMemberByUserId(threadUserId);
  const chatId = createChatId(currentUserId, threadUserId);
  const member = await getMemberByUserId(threadUserId);

  if (!member) return null;

  return (
    <div>
      <Card className="h-[80vh] w-full">
        <CardHeader className="text-lg md:text-xl font-semibold text-default-foreground">
          <div className="flex items-center gap-5">
            <div className="block md:hidden flex-shrink-0">
              <PresenceAvatar userId={threadUserId} src={member.image} />
            </div>
            <div className="flex items-center h-full">
              Chat with{" "}
              <span className="text-pink-500 italic ml-1">&quot;{member.name}&quot;</span>
            </div>
          </div>
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
