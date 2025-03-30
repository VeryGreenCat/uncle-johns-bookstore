"use client";

import { Table, Button, Input, Image, Modal, message } from "antd";
import Link from "next/link";
import {
  PlusOutlined,
  LeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Book } from "@/utils/types";

const { confirm } = Modal;

const AdminStockManagement = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/book/getBook");
      const data = await res.json();
      if (res.ok) {
        setBooks(data.books);
      } else {
        message.error("ไม่สามารถโหลดรายการหนังสือได้");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดขณะโหลดหนังสือ");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (bookId: string) => {
    confirm({
      title: "คุณแน่ใจหรือไม่ว่าต้องการลบหนังสือเล่มนี้?",
      icon: <ExclamationCircleOutlined />,
      content: "เมื่อลบแล้วจะไม่สามารถกู้คืนได้",
      okText: "ยืนยัน",
      okType: "danger",
      cancelText: "ยกเลิก",
      onOk: async () => {
        try {
          const res = await fetch("/api/book/deleteBook", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookId }),
          });

          const result = await res.json();
          if (res.ok) {
            message.success("ลบหนังสือเรียบร้อย");
            fetchBooks();
          } else {
            message.error(result.error);
          }
        } catch (error) {
          message.error("เกิดข้อผิดพลาดขณะลบหนังสือ");
        }
      },
    });
  };

  const columns = [
    {
      title: "ปกหนังสือ",
      dataIndex: "imageURL",
      key: "imageURL",
      render: (imageURL: string | undefined) => (
        <Image src={imageURL} alt="Book imageURL" width={50} height={70} />
      ),
    },
    {
      title: "รหัสหนังสือ",
      dataIndex: "bookId",
      key: "bookId",
    },
    {
      title: "ชื่อหนังสือ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ราคา",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "ส่วนลด%",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "จำนวน",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "จัดการ",
      key: "action",
      render: (text: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() =>
              router.push(`/admin/adminEditDetail?bookId=${record.bookId}`)
            }
          >
            แก้ไข
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.bookId)}
          >
            ลบ
          </Button>
        </div>
      ),
    },
  ];

  const filteredBooks = (books || []).filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-[#FFFFF0]">
      {/* ปุ่มกลับ */}
      <div className="relative w-full mb-4">
        <Link href="/admin/adminHomepage">
          <Button
            type="primary"
            icon={<LeftOutlined />}
            className="absolute text-white py-2 rounded-lg my-2"
          >
            กลับ
          </Button>
        </Link>
      </div>

      {/* ส่วนของ Header */}
      <div className="mt-3 px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-black text-xl font-bold">Stock Management</h1>
          <div className="flex items-center gap-4">
            <Input.Search
              placeholder="Search"
              className="w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link href="/admin/adminAddBook">
              <Button type="primary" icon={<PlusOutlined />}>
                เพิ่มหนังสือใหม่
              </Button>
            </Link>
          </div>
        </div>

        {/* ตารางข้อมูลหนังสือ */}
        <Table
          columns={columns}
          dataSource={filteredBooks}
          loading={loading}
          pagination={false}
          rowKey="bookId"
          bordered
          className="mt-3"
        />
      </div>
    </div>
  );
};

export default AdminStockManagement;
