"use client";
import { useState } from "react";
import { Card, Rate } from "antd";

const orders = [
  {
    id: 1,
    date: "March 16, 2021",
    orderNumber: "3014577620",
    product: "Microsoft Surface Duo",
    price: "$1,399.99",
    status: "In transit",
    estimatedDelivery: "April 10, 2021",
    image: "/surface-duo.jpg",
    rating: 0,
  },
  {
    id: 2,
    date: "March 10, 2021",
    orderNumber: "3014577619",
    product: "Mafia City Exclusive Bundle",
    price: "$499.99",
    status: "Completed",
    image: "/mafia-city.jpg",
    rating: 0,
  },
];

export default function OrderHistory() {
  const [orderList, setOrderList] = useState(orders);

  const handleRating = (id: number, value: number) => {
    setOrderList((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, rating: value ?? 0 } : order
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
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orderList.map((order) => (
        <Card key={order.id} className="shadow-lg p-8 rounded-xl mb-6">
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <p className="text-gray-600">
                {order.date} | Order #{order.orderNumber}
              </p>
              <h2 className="text-lg font-semibold">{order.product}</h2>
              <p className="text-gray-700">{order.price}</p>

              {order.status === "Completed" ? (
                <p className="text-green-600 font-semibold">Completed</p>
              ) : (
                <div>
                  <p className="text-yellow-600 font-semibold">
                    {order.status}
                  </p>
                  <button
                    onClick={() => handleConfirmDelivery(order.id)}
                    className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Confirm Delivery
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
