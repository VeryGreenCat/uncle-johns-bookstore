import type { Metadata } from "next";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";

import Navbar from "./components/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Uncle John's Bookstore",
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <div>
        <Navbar />
        <AntdRegistry>{children}</AntdRegistry>
      </div>
    </body>
  </html>
);

export default RootLayout;
