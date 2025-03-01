"use client";
import { useState } from "react";
import { Card, Rate } from "antd";

const orders = [
  {
    id: 1,
    date: "28 มีนาคม 2568",
    orderNumber: "3014577620",
    status: "In transit",
    products: [
      {
        id: 101,
        name: "Microsoft Surface Duo",
        price: 1399.99,
        image: "/surface-duo.jpg",
        rating: 0,
      },
      {
        id: 102,
        name: "Surface Pen",
        price: 99.99,
        image: "/surface-pen.jpg",
        rating: 0,
      },
    ],
  },
  {
    id: 2,
    date: "10 มกราคม 2566",
    orderNumber: "3014577619",
    status: "Completed",
    products: [
      {
        id: 201,
        name: "Mafia City Exclusive Bundle",
        price: 499.99,
        image: "/mafia-city.jpg",
        rating: 5,
      },
    ],
  },
];

export default function OrderHistory() {
  const [orderList, setOrderList] = useState(orders);

  const handleRating = (orderId: number, productId: number, value: number) => {
    setOrderList((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              products: order.products.map((product) =>
                product.id === productId && product.rating === 0
                  ? { ...product, rating: value ?? 0 }
                  : product
              ),
            }
          : order
      )
    );
  };

  const handleConfirmDelivery = (id: number) => {
    setOrderList((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "Completed" } : order
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">ประวัติคำสั่งซื้อ</h1>
      {orderList.map((order) => {
        // Calculate total price
        const totalPrice = order.products.reduce(
          (sum, product) => sum + product.price,
          0
        );

        return (
          <Card key={order.id} className="mb-8 shadow-md p-6">
            <p className="text-gray-600">
              {order.date} | Order #{order.orderNumber}
            </p>
            <div className="space-y-4">
              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-700">{product.price.toFixed(2)}฿</p>
                    {order.status === "Completed" ? (
                      <Rate
                        allowHalf
                        value={product.rating}
                        disabled={product.rating > 0}
                        onChange={(value) =>
                          handleRating(order.id, product.id, value)
                        }
                      />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            {/* Display Total Price */}
            <p className="text-lg font-semibold text-gray-800 mt-4">
              รวมทั้งหมด: {totalPrice.toFixed(2)}฿
            </p>

            {/* Bottom Section with Status (Left) & Button (Right) */}
            <div className="flex justify-between items-center mt-4">
              {/* Order Status - Left Bottom */}
              <p
                className={`text-sm font-semibold ${
                  order.status === "In transit"
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                {order.status}
              </p>

              {/* Confirm Delivery Button - Right Bottom */}
              {order.status !== "Completed" && (
                <button
                  onClick={() => handleConfirmDelivery(order.id)}
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
