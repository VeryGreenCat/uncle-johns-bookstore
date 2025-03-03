import type { Metadata } from "next";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";

import SessionProvider from "./components/SessionProvider";
import { getServerSession } from "next-auth";

import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Uncle John's Bookstore",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <div>
            <Navbar />
            <AntdRegistry>{children}</AntdRegistry>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
