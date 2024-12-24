import { sendResponse } from "@/types";
import { create } from "zustand";

type RequestStatusStore = {
  requestInfo: sendResponse | null;
  setRequestInfo: (status: sendResponse | null) => void;
  fetchRequestInfo: (senderId: string, receiverId: string) => Promise<void>;
  sendRequest: (senderId: string, receiverId: string) => Promise<void>;
  acceptRequest: (requestId: string) => Promise<void>;
  rejectRequest: (requestId: string) => Promise<void>;
};

export const useRequestStore = create<RequestStatusStore>((set) => ({
  requestInfo: null,
  setRequestInfo: (status) => set({ requestInfo: status }),
  fetchRequestInfo: async (senderId, receiverId) => {
    try {
      const response = await fetch(
        `/api/check-request-status?senderId=${senderId}&receiverId=${receiverId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch request status");
      }
      const data = await response.json();
      set({ requestInfo: data });
    } catch (error) {
      console.error("Failed to fetch request status:", error);
    }
  },

  sendRequest: async (senderId, receiverId) => {
    try {
      const response = await fetch(`/api/send-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderId, receiverId }),
      });
      if (!response.ok) {
        throw new Error("Failed to send request");
      }
      const data = await response.json();
      set({ requestInfo: data });
    } catch (error) {
      console.error("Failed to send request:", error);
    }
  },

  acceptRequest: async (requestId) => {
    try {
      const response = await fetch(`/api/accept-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      });
      if (!response.ok) {
        throw new Error("Failed to accept request");
      }
      const data = await response.json();
      set({ requestInfo: data });
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  },

  rejectRequest: async (requestId) => {
    try {
      const response = await fetch(`/api/reject-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      });
      if (!response.ok) {
        throw new Error("Failed to reject request");
      }
      const data = await response.json();
      set({ requestInfo: data });
    } catch (error) {
      console.error("Failed to reject request:", error);
    }
  },
}));
