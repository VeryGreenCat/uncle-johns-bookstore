import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";
import Login from "./Login";

const Navbar = () => {
  return (
    <nav className="bg-[#84592B] px-6 py-3 flex items-center justify-between">
      <Link href={"/"} className="text-lg font-bold text-white">
        Uncle John's Bookstore
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
