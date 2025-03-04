import { Card } from "antd";
import Link from "next/link";

const AdminHomepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Content */}
      <div className="flex-grow flex items-center justify-center bg-beige-500 p-8">
        <div className="grid grid-cols-2 gap-24">
          <Link href="/adminEditBanner">
            <Card className="w-96 h-72  p-6 hover:shadow-lg flex items-center justify-center">
              <div className="text-2xl">เพิ่ม / แก้ไขภาพแบนเนอร์</div>
            </Card>
          </Link>
          <Link href="/adminStockManagement">
            <Card className="w-96 h-72  p-6 hover:shadow-lg flex items-center justify-center">
              <div className="text-2xl">เพิ่ม / แก้ไขสต๊อกสินค้า</div>
            </Card>
          </Link>
          <Link href="/adminEditCategory">
            <Card className="w-96 h-72  p-6 hover:shadow-lg flex items-center justify-center">
              <div className="text-2xl">เพิ่ม / แก้ไขหมวดหมู่หนังสือ</div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
