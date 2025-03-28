"use client";

import { Card, Button, Table, Avatar, message } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserId } from "@/utils/shareFunc";

const Favourite = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (userEmail) {
        try {
          const response = await fetch(
            `/api/favourite/getFavourite?email=${userEmail}`
          );
          const data = await response.json();
          console.log(data);
          setWishlist(data.favourites || []);
        } catch (error) {
          message.error("ไม่สามารถโหลดข้อมูลรายการโปรดได้");
        }
      }
    };

    fetchWishlist();
  }, [userEmail]);

  const handleRemove = async (bookId: string) => {
    if (!userEmail) {
      message.error("User email is not available");
      return;
    }
    const userId = await getUserId(userEmail);

    try {
      const res = await fetch("/api/favourite/removeFavourite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, bookId: bookId }),
      });

      const data = await res.json();

      if (res.ok) {
        setWishlist(wishlist.filter((item) => item.book.bookId !== bookId));
        message.success("ลบสินค้าจากรายการโปรดเรียบร้อย");
      } else {
        message.error(data.error || "ไม่สามารถลบสินค้าจากรายการโปรดได้");
      }
    } catch (error) {
      message.error("ไม่สามารถลบสินค้าจากรายการโปรดได้");
    }
  };

  const handleAddToCart = (record: any) => {
    if (record.book.quantity === 0) {
      message.error("สินค้าหมด ไม่สามารถเพิ่มลงตะกร้าได้");
    } else {
      message.success("เพิ่มสินค้าลงตะกร้าเรียบร้อย");
    }
  };

  const columns = [
    {
      title: "สินค้า",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div className="flex items-center space-x-4">
          <Avatar
            shape="square"
            size={128}
            src={record.book.imageURL} // ใช้ URL รูปภาพที่เหมาะสม
            style={{ width: "128px", height: "auto", objectFit: "contain" }} // ทำให้รูปพอดีกับขนาด
          />
        </div>
      ),
    },
    {
      title: "ชื่อหนังสือ",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => <span>{record.book.name}</span>,
    },
    {
      title: "ราคา",
      dataIndex: "price",
      key: "price",
      render: (price: number, record: any) => {
        return (
          <span>
            {record.book.price -
              (record.book.discount * record.book.price) / 100}{" "}
            บาท
          </span>
        );
      },
    },
    {
      title: "สถานะสินค้า",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number, record: any) => (
        <span
          className={
            record.book.quantity > 0
              ? "text-black " // สีดำถ้ามีสินค้า
              : "text-red-500 font-semibold" // สีแดงถ้าหมด
          }
        >
          {record.book.quantity > 0 ? "มีสินค้า" : "สินค้าหมดแล้ว"}
        </span>
      ),
    },
    {
      title: "",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex space-x-5 justify-end">
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => handleAddToCart(record)}
          >
            เพิ่มลงตะกร้า
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemove(record.book.bookId)}
          >
            ลบจากรายการโปรด
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-full mx-auto">
      <Card
        title={
          <h2 className="text-xl font-semibold text-center">
            รายการโปรดของฉัน
          </h2>
        }
      >
        <Table
          dataSource={wishlist}
          columns={columns}
          rowKey="bookId"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default Favourite;
