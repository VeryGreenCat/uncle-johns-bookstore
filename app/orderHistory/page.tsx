"use client";

import { useEffect, useState } from "react";
import { getUserId } from "@/utils/shareFunc";
import { useSession } from "next-auth/react";
import { Card, Rate } from "antd";
import BookComponent from "./book";

export default function OrderHistory() {
  const { data: session } = useSession();
  const [orderList, setOrderList] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (session?.user?.email) {
        const userId = await getUserId(session.user.email);
        const response = await fetch("/api/cart/getOrderHistory", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });

        const result = await response.json();
        if (result.orders) {
          const groupedOrders = result.orders.reduce((acc: any, order: any) => {
            if (!acc[order.orderId]) {
              acc[order.orderId] = {
                orderId: order.orderId,
                timestamp: order.timestamp,
                products: [],
                totalPrice: 0,
                receiveConfirmed: order.receiveConfirmed,
              };
            }
            acc[order.orderId].products.push(order);
            acc[order.orderId].totalPrice +=
              order.pricePerDetail * order.quantity;
            return acc;
          }, {});

          const sortedOrders = Object.values(groupedOrders).sort(
            (a: any, b: any) => {
              if (!a.receiveConfirmed && b.receiveConfirmed) return -1;
              if (a.receiveConfirmed && !b.receiveConfirmed) return 1;
              return (
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
              );
            }
          );

          setOrderList(sortedOrders);
        }
      }
    };

    fetchOrders();
  }, [session]);

  const handleConfirmDelivery = async (orderId: string) => {
    const response = await fetch("/api/cart/updateReceiveConfirmed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    });

    const result = await response.json();

    if (result.success) {
      setOrderList((prev) => {
        const updatedOrders = prev.map((order) =>
          order.orderId === orderId
            ? { ...order, receiveConfirmed: true }
            : order
        );

        return [...updatedOrders].sort((a, b) => {
          if (!a.receiveConfirmed && b.receiveConfirmed) return -1;
          if (a.receiveConfirmed && !b.receiveConfirmed) return 1;
          return (
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
        });
      });
    } else {
      alert("ไม่สามารถยืนยันการได้รับสินค้าได้");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">ประวัติคำสั่งซื้อ</h1>
      {orderList
        .sort((a, b) => (!a.receiveConfirmed && b.receiveConfirmed ? -1 : 1))
        .map((order) => {
          return (
            <Card key={order.orderId} className="mb-8 shadow-md p-6">
              <p className="text-gray-600 mb-4">
                {new Date(order.timestamp).toLocaleString()} | Order #
                {order.orderId}
              </p>
              <div className="space-y-4">
                {order.products.map((product: any) => (
                  <BookComponent
                    key={product.bookId}
                    product={product}
                    order={order}
                  />
                ))}
              </div>

              <p className="text-lg font-semibold text-gray-800 mt-4">
                รวมทั้งหมด: {order.totalPrice.toFixed(2)} บาท
              </p>

              <div className="flex justify-between items-center mt-4">
                <p
                  className={`text-sm font-semibold ${
                    order.receiveConfirmed
                      ? "text-green-600"
                      : "text-yellow-500"
                  }`}
                >
                  {order.receiveConfirmed ? "ได้รับสินค้าแล้ว" : "กำลังจัดส่ง"}
                </p>

                {!order.receiveConfirmed && (
                  <button
                    onClick={() => handleConfirmDelivery(order.orderId)}
                    className="bg-[#9D9167] text-white px-4 py-2 text-base rounded-lg hover:bg-[#8d8050] transition"
                  >
                    ยืนยันได้รับสินค้าแล้ว
                  </button>
                )}
              </div>
            </Card>
          );
        })}
    </div>
  );
}
