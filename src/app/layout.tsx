import "./globals.css";
import { Metadata } from "next";
import { ReactNode } from "react";
import Providers from "@/components/Providers";
import TopNav from "@/components/nav-bar/TopNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "MatchMe",
  description: "A Dating App",
  icons: {
    icon: "/images/app_logo.svg",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Providers>
            <TopNav />
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
