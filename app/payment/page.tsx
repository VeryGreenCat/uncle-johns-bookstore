"use client";
import { useState } from "react";
import { Steps, Button } from "antd";
import OrderDetail from "../components/payment/OrderDetail";
import PaymentDetail from "../components/payment/PaymentDetail";
import { CheckCircleOutlined } from "@ant-design/icons";

const Payment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">คำสั่งซื้อ</h2>
      <Steps current={currentStep} className="my-4">
        <Steps.Step title="รายละเอียดสินค้า" />
        <Steps.Step title="การชำระเงิน" />
        <Steps.Step title="ยืนยันการสั่งซื้อ" />
      </Steps>
      <div className="bg-white p-6 mt-4 rounded-lg shadow-lg">
        <div className="max-h-1/2">
          {currentStep === 0 && <OrderDetail />}
          {currentStep === 1 && <PaymentDetail />}
          {currentStep === 2 && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <CheckCircleOutlined className="text-green-500 text-6xl" />
              <h2 className="text-xl font-bold text-gray-700">
                ชำระเงินเสร็จสิ้น
              </h2>
              <Button
                type="primary"
                onClick={() => (window.location.href = "/")}
              >
                กลับสู่หน้าหลัก
              </Button>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex ">
            {currentStep > 0 && currentStep < 2 && (
              <Button onClick={() => setCurrentStep(currentStep - 1)}>
                ย้อนกลับ
              </Button>
            )}
          </div>
          <div className="flex">
            {currentStep < 1 && (
              <Button
                type="primary"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                ดำเนินการต่อ
              </Button>
            )}
            {currentStep === 1 && (
              <Button
                type="primary"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                ชำระเงิน
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
