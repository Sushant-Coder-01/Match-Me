import { MessageDto } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type MessagesState = {
  messages: MessageDto[];
  unreadCount: number;
  add: (message: MessageDto) => void;
  remove: (id: string) => void;
  setMessages: (messages: MessageDto[]) => void;
  updateUnreadCount: (amount: number) => void;
};

const useMessageStore = create<MessagesState>()(
  devtools(
    (set) => ({
      messages: [],
      unreadCount: 0,
      unreadSenderIds: {},
      add: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      remove: (id) =>
        set((state) => ({
          messages: state.messages.filter((message) => message.id !== id),
        })),
      setMessages: (messages) => set({ messages: messages }),
      updateUnreadCount: (amount) =>
        set((state) => ({ unreadCount: state.unreadCount + amount })),
    }),
    { name: "MessageStore" }
  )
);

export default useMessageStore;
