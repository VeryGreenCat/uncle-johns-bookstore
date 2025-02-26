"use client";
import { useState } from "react";
import { Steps, Button, Select, Modal } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const Payment = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      title: "The Light Beyond the Garden Wall",
      price: 20,
      quantity: 1,
    },
    { id: 2, title: "The Tigers Heart", price: 20, quantity: 1 },
    { id: 3, title: "Little Bird Lands", price: 20, quantity: 1 },
  ]);
  const [delivery, setDelivery] = useState(15);
  const [currentStep, setCurrentStep] = useState(0);

  const updateQuantity = (id: any, delta: any) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: any) => {
    Modal.confirm({
      title: "คุณแน่ใจหรือไม่ว่าต้องการลบสินค้า?",
      content: "สินค้าจะถูกลบออกจากตะกร้า",
      onOk: () => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
      },
    });
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">คำสั่งซื้อ</h2>
      <Steps current={currentStep} className="my-4">
        <Steps.Step title="รายละเอียดสินค้า" />
        <Steps.Step title="การชำระเงิน" />
        <Steps.Step title="ยืนยันการสั่งซื้อ" />
      </Steps>
      <div className="bg-white p-6 mt-4 rounded-lg shadow-lg">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-4"
          >
            <span className="text-lg flex-1">{item.title}</span>
            <div className="flex items-center">
              <Button
                icon={<MinusOutlined />}
                onClick={() => updateQuantity(item.id, -1)}
              />
              <span className="mx-2 w-6 text-center">{item.quantity}</span>
              <Button
                icon={<PlusOutlined />}
                onClick={() => updateQuantity(item.id, 1)}
              />
            </div>
            <span className="text-lg w-16 text-right">
              ${item.price * item.quantity}
            </span>
            <Button
              className="m-2"
              danger
              icon={<DeleteOutlined />}
              onClick={() => removeItem(item.id)}
            />
          </div>
        ))}
        <div className="flex justify-between py-4 font-bold text-xl">
          <span>ยอดรวมทั้งหมด:</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex ">
            {currentStep > 0 && (
              <Button onClick={() => setCurrentStep(currentStep - 1)}>
                ย้อนกลับ
              </Button>
            )}
          </div>
          <div className="flex">
            {currentStep < 2 && (
              <Button
                type="primary"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                ดำเนินการต่อ
              </Button>
            )}
            {currentStep === 2 && <Button type="primary">ชำระเงิน</Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
