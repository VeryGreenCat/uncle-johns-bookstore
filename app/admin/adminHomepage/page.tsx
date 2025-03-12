import { Card } from "antd";
import Link from "next/link";

const adminOptions = [
  { href: "/admin/adminEditBanner", title: "เพิ่ม / แก้ไขภาพแบนเนอร์" },
  { href: "/admin/adminStockManagement", title: "เพิ่ม / แก้ไขสต๊อกสินค้า" },
  { href: "/admin/adminEditCategory", title: "เพิ่ม / แก้ไขหมวดหมู่หนังสือ" },
];

const AdminHomepage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-8">
      {/* Admin Options Grid */}
      <div className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-3 gap-12">
          {adminOptions.map((option, index) => (
            <Link key={index} href={option.href}>
              <Card
                className="w-80 h-64 p-6 flex items-center justify-center text-center 
                border border-gray-300 shadow-md bg-white rounded-2xl 
                hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="text-xl font-semibold text-gray-700">
                  {option.title}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
