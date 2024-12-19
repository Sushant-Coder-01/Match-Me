"use client";

import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NetworkStatus: React.FC = () => {
  useEffect(() => {
    const handleOnline = () => {
      toast.dismiss(); // Dismiss any previous "offline" toasts
      toast.success("You're back online!", { autoClose: 3000 });
    };

    const handleOffline = () => {
      toast.error("You are offline. Check your connection!", {
        autoClose: false,
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Show initial offline state if necessary
    if (!navigator.onLine) {
      toast.error("You are offline. Check your connection!", {
        autoClose: false,
      });
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <ToastContainer />;
};

export default NetworkStatus;
