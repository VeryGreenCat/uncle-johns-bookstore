"use client";
import { Table, Button, Input, Avatar, Image } from "antd";
import Link from "next/link";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";

const AdminStockManagement = () => {
  const columns = [
    {
      title: "ปกหนังสือ",
      dataIndex: "cover",
      key: "cover",
      render: (cover: any) => (
        <Image src={cover} alt="Book Cover" width={50} height={70} />
      ),
    },
    {
      title: "รหัสหนังสือ",
      dataIndex: "bookId",
      key: "bookId",
    },
    {
      title: "ชื่อหนังสือ",
      dataIndex: "bookName",
      key: "bookName",
    },
    {
      title: "ประเภทหนังสือ",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "จำนวน",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "จัดการ",
      key: "action",
      render: () => (
        <Button type="primary" danger href="/adminEditDetail">
          แก้ไข
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      cover: "/images/book1.jpg", // ✅ ใส่ path รูปภาพ
      bookId: "B001",
      bookName: "หนังสือเล่มที่ 1",
      category: "นิยาย",
      quantity: 100,
    },
    {
      key: "2",
      cover: "/images/book2.jpg",
      bookId: "B002",
      bookName: "หนังสือเล่มที่ 2",
      category: "สารคดี",
      quantity: 50,
    },
    {
      key: "3",
      cover: "/images/book3.jpg",
      bookId: "B003",
      bookName: "หนังสือเล่มที่ 3",
      category: "การ์ตูน",
      quantity: 80,
    },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* ปุ่มย้อนกลับ */}
      <div className="relative w-full">
        <a href="/adminHomepage">
          <Button
            type="primary"
            icon={<LeftOutlined />}
            className="absolute text-white py-2 rounded-lg my-2"
          >
            กลับ
          </Button>
        </a>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-black text-xl font-bold">Stock Management</h1>
          <div className="flex items-center gap-4">
            <Input.Search placeholder="Search" className="w-64" />
            <Link href="/adminAddBook">
              <Button type="primary" icon={<PlusOutlined />}>
                เพิ่มหนังสือใหม่
              </Button>
            </Link>
          </div>
        </div>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

export default AdminStockManagement;
