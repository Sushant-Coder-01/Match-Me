import { create } from "zustand";
import { devtools } from "zustand/middleware";

type PresenceState = {
  memberId: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
};

const usePresenceStore = create<PresenceState>()(
  devtools(
    (set) => ({
      memberId: [],
      add: (id) =>
        set((state) => {
          if (!state.memberId.includes(id)) {
            return { memberId: [...state.memberId, id] };
          }
          return {};
        }),
      remove: (id) =>
        set((state) => {
          const newMemberId = state.memberId.filter(
            (memberId) => memberId !== id
          );
          if (newMemberId.length !== state.memberId.length) {
            return { memberId: newMemberId };
          }
          return {};
        }),
      set: (ids) =>
        set((state) => {
          if (state.memberId.join() !== ids.join()) {
            return { memberId: ids };
          }
          return {};
        }),
    }),
    { name: "PresenceStore", enabled: process.env.NODE_ENV === "development" }
  )
);

export default usePresenceStore;
