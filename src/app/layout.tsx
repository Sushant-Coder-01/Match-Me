import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";
import { ReactNode } from "react";
import Providers from "@/components/Providers";
import TopNav from "@/components/nav-bar/TopNav";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import NetworkStatus from "@/components/NetworkStatus ";

export const metadata: Metadata = {
  title: "MatchMe",
  description: "A Dating App",
  icons: {
    icon: "/images/app_logo.svg",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  const userId = session?.user?.id || null;
  const profileComplete = session?.user?.profileComplete as boolean;
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Providers userId={userId} profileComplete={profileComplete}>
            <TopNav />
            <NetworkStatus />
            <main className="container mx-auto">{children}</main>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              theme="light"
            />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
