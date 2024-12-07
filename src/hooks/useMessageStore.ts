import { MessageDto } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type MessagesState = {
  messages: MessageDto[];
  unreadCount: number;
  add: (message: MessageDto) => void;
  remove: (id: string) => void;
  set: (messages: MessageDto[]) => void;
  updateUnreadCount: (amount: number) => void;
};

const useMessageStore = create<MessagesState>()(
  devtools(
    (set) => ({
      messages: [],
      unreadCount: 0,
      add: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      remove: (id) =>
        set((state) => ({
          messages: state.messages.filter((message) => message.id !== id),
        })),
      set: (messages) => ({ messages: messages }),
      updateUnreadCount: (amount) =>
        set((state) => ({ unreadCount: state.unreadCount + amount })),
    }),
    { name: "MessageStore" }
  )
);

export default useMessageStore;
