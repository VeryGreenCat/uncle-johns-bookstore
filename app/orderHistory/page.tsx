"use client"; // Ensure compatibility with Next.js App Router

import React from "react";
import { Card, Rate } from "antd";

const orders = [
  {
    date: "16 มีนาคม 2567",
    orderNumber: "3014577620",
    total: 1899.98,
    books: [
      {
        title: "Microsoft Surface Duo",
        price: 1399.99,
        image:
          "https://storage.naiin.com/system/application/bookstore/resource/product/202110/534926/1000244160_front_XXL.jpg?imgname=HEARTSTOPPER-%E0%B8%AB%E0%B8%A2%E0%B8%B8%E0%B8%94%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B9%83%E0%B8%88%E0%B9%84%E0%B8%A7%E0%B9%89%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%99%E0%B8%B2%E0%B8%A2-%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%A1-1",
        rating: 4.5,
      },
      {
        title: "The Art of Innovation",
        price: 499.99,
        image:
          "https://ff.lnwfile.com/_webp_max_images/1024/1024/hm/dw/yc.webp",
        rating: 3.5,
      },
    ],
  },
  {
    date: "10 ธันวาคม 2567",
    orderNumber: "3014577619",
    total: 899.98,
    books: [
      {
        title: "Mafia City Exclusive Bundle",
        price: 499.99,
        image:
          "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_360,c_scale,dpr_1.5/jackets/9781408855713.jpg",
        rating: 5,
      },
      {
        title: "The Entrepreneur’s Playbook",
        price: 399.99,
        image:
          "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_360,c_scale,dpr_1.5/jackets/9781408855652.jpg",
        rating: 2.5,
      },
    ],
  },
];

export default function OrderHistory() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6">ประวัติการสั่งซื้อ</h2>

      {orders.map((order, index) => (
        <Card key={index} className="mb-8 shadow-md border border-gray-200 p-4">
          {/* Order Info */}
          <p className="text-gray-500 text-sm mb-2">
            {order.date} | Order #{order.orderNumber}
          </p>

          {/* Book List */}
          <div className="space-y-4">
            {order.books.map((book, bookIndex) => (
              <div key={bookIndex} className="flex gap-6 items-center">
                {/* Book Cover */}
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded-md"
                  onError={(e) => (e.currentTarget.src = "/images/default.jpg")}
                />

                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{book.title}</h4>
                  <p className="text-lg font-bold">{book.price.toFixed(2)} ฿</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-600">ให้คะแนน</span>
                    <Rate allowHalf defaultValue={book.rating} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Total */}
          <div className="mt-4 pt-4 border-t">
            <p className="text-gray-700 font-medium text-lg">
              รวมทั้งหมด: {order.total.toFixed(2)} ฿
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
