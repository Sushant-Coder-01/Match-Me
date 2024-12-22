"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const SendRequestButton = ({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) => {
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    if (!senderId || !receiverId) {
      toast.error("Invalid sender or receiver.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/send-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderId, receiverId }),
      });

      if (response.ok) {
        toast.success("Request sent successfully!");
      } else {
        const { message } = await response.json();
        toast.error(message || "Failed to send request.");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={sendRequest}
      disabled={loading}  
      className={`px-4 py-2 rounded ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-pink-500 text-white hover:bg-pink-600"
      }`}
    >
      {loading ? "Sending..." : "Send Request"}
    </button>
  );
};

export default SendRequestButton;
