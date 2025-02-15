import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-300 px-6 py-3 flex items-center justify-between">
      <Link href={"/"} className="text-lg font-bold">
        Uncle John's
      </Link>

      <div className="flex items-center space-x-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-400 transition">
          <Link href={"/favourite"}>
            <HeartOutlined />
          </Link>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-400 transition">
          <Link href={"/cart"}>
            <ShoppingCartOutlined />
          </Link>
        </button>
        <Button type="primary">
          <Link href={"/login"}>login</Link>
        </Button>
      </div>
    </nav>
  );
};
export default Navbar;
