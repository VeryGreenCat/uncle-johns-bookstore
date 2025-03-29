import { useState, useEffect } from "react";
import { Button, Modal, Spin } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const OrderDetail = ({ userId }: { userId: string }) => {
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        // Fetch cart details
        const orderDetailRes = await fetch("/api/cart/getOrderDetail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
        const orderDetails = await orderDetailRes.json();
        setOrderDetails(orderDetails.items);
      } catch (error) {
        console.error("Error fetching cart details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrderDetails();
    }
  }, [userId]);

  const updateQuantity = (bookId: string, delta: number) => {
    setOrderDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.bookId === bookId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (bookId: string) => {
    Modal.confirm({
      title: "คุณแน่ใจหรือไม่ว่าต้องการลบสินค้า?",
      content: "สินค้าจะถูกลบออกจากคำสั่งซื้อ",
      onOk: () => {
        setOrderDetails((prevDetails) =>
          prevDetails.filter((item) => item.bookId !== bookId)
        );
      },
    });
  };

  const totalItems = (orderDetails || []).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalPrice = (orderDetails || []).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin />
        </div>
      ) : (
        orderDetails.map((item) => (
          <div
            key={item.bookId}
            className="flex justify-between items-center border-b py-4"
          >
            <span className="text-lg flex-1">{item.name}</span>
            <div className="flex items-center">
              <Button
                icon={<MinusOutlined />}
                onClick={() => updateQuantity(item.bookId, -1)}
              />
              <span className="mx-2 w-6 text-center">{item.quantity}</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() => updateQuantity(item.bookId, 1)}
              />
            </div>
            <span className="text-lg w-16 text-right mr-4">
              ${item.price * item.quantity}
            </span>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => removeItem(item.bookId)}
            />
          </div>
        ))
      )}
      <div className="flex justify-between py-4 font-bold text-xl">
        <span>ยอดรวมทั้งหมด ({totalItems} รายการ):</span>
        <span>${totalPrice}</span>
      </div>
    </div>
  );
};

export default OrderDetail;
