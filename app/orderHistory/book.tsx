"use client";

import React, { useState } from "react";
import { Rate } from "antd";

function BookComponent({ product, order }: { product: any; order: any }) {
  const [rateSetup, setRateSetup] = useState(product.rating != 0);
  const [rate, setRate] = useState(product.rating || 0);

  const handleRating = async (
    orderId: string,
    productId: string,
    value: number
  ) => {
    try {
      const response = await fetch("/api/cart/rateBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, bookId: productId, rating: value }),
      });
      return true;
    } catch (error) {
      console.error("Error rating book:", error);
      alert("เกิดข้อผิดพลาดในการให้คะแนน");
    }
    return false;
  };

  return (
    <div key={product.bookId} className="flex items-center gap-4 border-b pb-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-fit h-20 rounded"
      />
      <div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-700">{product.pricePerDetail.toFixed(2)} บาท</p>
        <p className="text-gray-700">จำนวน: {product.quantity}</p>
        {order.receiveConfirmed ? (
          <Rate
            allowHalf
            value={rate}
            disabled={rateSetup}
            onChange={async (value) => {
              if (rateSetup) return;
              setRateSetup(true);
              setRate(value);
              const res = await handleRating(
                order.orderId,
                product.bookId,
                value
              );
              setRateSetup(res);
              if (!res) {
                setRate(0);
              }
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default BookComponent;
