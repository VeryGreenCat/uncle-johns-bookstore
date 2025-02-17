import type { Metadata } from "next";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Uncle John's Bookstore",
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <div className="bg-[#FAEBD7]">
        <Navbar />
        <AntdRegistry>{children}</AntdRegistry>
        <Footer />
      </div>
    </body>
  </html>
);

export default RootLayout;
