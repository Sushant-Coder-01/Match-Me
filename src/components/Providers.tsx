"use client";

import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

const Providers = ({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string | null;
}) => {
  usePresenceChannel();
  useNotificationChannel(userId);
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
