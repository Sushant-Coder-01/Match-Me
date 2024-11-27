import { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/components/Providers";
import TopNav from "@/components/nav-bar/TopNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "MatchMe",
  description: "A Dating App",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
};

export default RootLayout;
