"use client";

import { useEffect, useState } from "react";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineMessage(true);
      setTimeout(() => {
        setShowOnlineMessage(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Set hasMounted to true after the initial render
    setHasMounted(true);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      {!isOnline && hasMounted && (
        <div className="fixed bottom-0 left-0 right-0 bg-pink-600 text-white text-center py-2 shadow-lg">
          <p className="font-semibold">
            You are offline. Check your connection!
          </p>
        </div>
      )}
      {isOnline && showOnlineMessage && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white text-center py-2 shadow-lg">
          <p className="font-semibold">You are back online!</p>
        </div>
      )}
    </div>
  );
};

export default NetworkStatus;
