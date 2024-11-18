import { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/components/Providers";
import TopNav from "@/components/nav-bar/TopNav";

export const metadata: Metadata = {
  title: "MatchMe",
  description: "A Dating App",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
