import Image from "next/image";
import Link from "next/link";

import logo from "/public/media/images/uncle_johns_logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#442D1C] text-white py-8 px-6 mt-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo & Description */}
        <div>
          <Image src={logo} alt="Bookstore Logo" width={100} height={100} />
          <p className="text-gray-400 text-sm">
            Discover a world of books at our bookstore. We offer a wide range of
            genres, bestsellers, and rare finds.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/">
                <span className="text-gray-400 hover:text-white cursor-pointer">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/shop">
                <span className="text-gray-400 hover:text-white cursor-pointer">
                  Shop
                </span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <span className="text-gray-400 hover:text-white cursor-pointer">
                  About Us
                </span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span className="text-gray-400 hover:text-white cursor-pointer">
                  Contact
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="text-gray-400 text-sm text-center md:text-right">
          © {new Date().getFullYear()} Bookstore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
