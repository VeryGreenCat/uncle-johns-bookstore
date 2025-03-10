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

const { confirm } = Modal;

const AdminStockManagement = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await fetch("/api/book/getBook");
      const data = await res.json();
      if (res.ok) {
        setBook(data.book);
      } else {
        message.error("ไม่สามารถโหลดรายการหนังสือได้");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดขณะโหลดหนังสือ");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (bookId) => {
    confirm({
      title: "คุณแน่ใจหรือไม่ว่าต้องการลบหนังสือเล่มนี้?",
      icon: <ExclamationCircleOutlined />,
      content: "เมื่อลบแล้วจะไม่สามารถกู้คืนได้",
      okText: "ใช่, ลบเลย",
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
            fetchBook();
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
      dataIndex: "cover",
      key: "cover",
      render: (cover) => (
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
      dataIndex: "name",
      key: "name",
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
      render: (text, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() =>
              router.push(`/adminEditDetail?id=${record.bookId}`)
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

  const filteredBook = book.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6">
      <div className="relative w-full">
        <Link href="/adminHomepage">
          <Button
            type="primary"
            icon={<LeftOutlined />}
            className="absolute text-white py-2 rounded-lg my-2"
          >
            กลับ
          </Button>
        </Link>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-black text-xl font-bold">Stock Management</h1>
          <div className="flex items-center gap-4">
            <Input.Search
              placeholder="Search"
              className="w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link href="/adminAddBook">
              <Button type="primary" icon={<PlusOutlined />}>
                เพิ่มหนังสือใหม่
              </Button>
            </Link>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={filteredBook}
          loading={loading}
          pagination={false}
          rowKey="bookId"
        />
      </div>
    </div>
  );
};

export default AdminStockManagement;
