"use client";

import { Card, Button, Table, Avatar, message } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserId } from "@/utils/shareFunc";

const Favourite = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    setLoading(true);
    const fetchWishlist = async () => {
      if (userEmail) {
        try {
          const response = await fetch(
            `/api/favourite/getFavourite?email=${userEmail}`
          );
          const data = await response.json();
          setWishlist(data.favourites || []);
        } catch (error) {
          message.error("ไม่สามารถโหลดข้อมูลรายการโปรดได้");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWishlist();
  }, [userEmail]);

  const handleAddToCart = async (record: any) => {
    // ตรวจสอบจำนวนสินค้า
    if (record.book.quantity === 0) {
      message.error("สินค้าหมด ไม่สามารถเพิ่มลงตะกร้าได้");
      return;
    }
    if (!userEmail) {
      message.error("User email is not available");
      return;
    }
    // ใช้ getUserId เพื่อหาค่า userId จาก userEmail
    const userId = await getUserId(userEmail);

    try {
      // เรียก API เพื่อรับ OrderId
      const orderRes = await fetch("/api/cart/getOrderId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const orderData = await orderRes.json();

      if (orderRes.ok) {
        const orderId = orderData.orderId;

        // ตรวจสอบว่าได้ OrderId แล้วหรือไม่
        if (!orderId) {
          message.error("ไม่สามารถสร้างคำสั่งซื้อได้");
          return;
        }

        // เรียก API เพื่อเพิ่ม OrderDetail
        const addOrderDetailRes = await fetch("/api/cart/addOrderDetail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            orderId: orderId,
            bookId: record.book.bookId,
            quantity: 1, // สมมติว่าเพิ่มทีละ 1 เล่ม
            price: Math.ceil(record.book.price - (record.book.discount * record.book.price) / 100),
          }),
        });

        const addOrderDetailData = await addOrderDetailRes.json();
        
        if (addOrderDetailRes.ok) {
          message.success("เพิ่มสินค้าลงตะกร้าเรียบร้อย");
        } else {
          message.error(
            addOrderDetailData.error || "ไม่สามารถเพิ่มสินค้าลงตะกร้าได้"
          );
        }
      } else {
        message.error(orderData.error || "ไม่สามารถสร้างคำสั่งซื้อได้");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการเพิ่มสินค้าลงตะกร้า");
    }
  };

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

  const columns = [
    {
      title: "สินค้า",
      dataIndex: "name",
      key: "name",
      render: (_: string, record: any) => (
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
      render: (_: string, record: any) => <span>{record.book.name}</span>,
    },
    {
      title: "ราคา",
      dataIndex: "price",
      key: "price",
      render: (_: number, record: any) => {
        return (
          <span>
            {Math.ceil(
              record.book.price -
                (record.book.discount * record.book.price) / 100
            )}{" "}
            บาท
          </span>
        );
      },
    },
    {
      title: "สถานะสินค้า",
      dataIndex: "stock",
      key: "stock",
      render: (_: number, record: any) => (
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
      render: (_: string, record: any) => (
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
    <div className="p-6 max-w-full mx-auto bg-[#FFFFF0]">
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
