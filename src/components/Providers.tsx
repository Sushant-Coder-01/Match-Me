"use client";

import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  usePresenceChannel();

  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
