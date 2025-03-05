import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import Login from "./Login";
import logo from "/public/media/images/uncle_johns_logo.png";

const Navbar = () => {
  return (
    <nav className="bg-[#84592B] px-6 py-3 flex items-center justify-between">
      <Link
        href={"/"}
        className="flex items-center gap-2 text-lg font-bold text-white"
      >
        <Image src={logo} alt="Bookstore Logo" width={60} height={60} />
        <span>Uncle John's Bookstore</span>
      </Link>

      <div className="flex items-center space-x-4">
        <Link href={"/favourite"}>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#E8D1A7] transition">
            <HeartOutlined style={{ color: "white", fontSize: "1.3rem" }} />
          </button>
        </Link>
        <Link href={"/payment"}>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#E8D1A7] transition">
            <ShoppingCartOutlined
              style={{ color: "white", fontSize: "1.3rem" }}
            />
          </button>
        </Link>

        <Login />
      </div>
    </nav>
  );
};
export default Navbar;
