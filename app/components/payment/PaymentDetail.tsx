import { Card, Button, Select } from "antd";
import { useState, useEffect } from "react";
import { getUserId } from "@/utils/shareFunc";

const { Option } = Select;

const PaymentDetail = () => {
  const Amount = 473;
  const totalAmount = 456.65;
  const discount = 6.35;
  const itemCount = 4;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userEmail = "test@example.com"; // เปลี่ยนเป็นค่าจริง
        const userId = await getUserId(userEmail);
        
        const response = await fetch("/api/address/getAddress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        if (data.addresses) {
          setAddresses(data.addresses.split(";").filter(addr => addr.trim() !== ""));
          setSelectedAddress(data.addresses.split(";")[0] || "");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, []);

  return (
    <div className="flex justify-between space-x-4 mb-4">
      <div className="w-3/5">
        <Card className="p-4 text-center">
          <span className="text-xl font-semibold">QR Code</span>
        </Card>
        <div className="my-4"></div>
        <Card className="p-4 mt-4">
          <span className="block font-bold mb-2">ที่อยู่</span>
          <Select
            className="mb-2 w-full"
            value={selectedAddress}
            onChange={setSelectedAddress}
          >
            {addresses.map((addr, index) => {
              const addressParts = addr.split(" ");
              const name = addressParts[0];
              return (
                <Option key={index} value={addr}>
                  {name}
                </Option>
              );
            })}
          </Select>
          <span className="block my-2 p-2">
            {selectedAddress.split(" ").slice(1).join(" ")}
          </span>
          <Button type="primary">เพิ่มที่อยู่</Button>
          <Button type="danger" className="ml-2">ลบที่อยู่</Button>
        </Card>
      </div>
      <div className="w-1/4">
        <Card className="p-4">
          <div className="flex justify-between text-lg mb-2">
            <span>จำนวน</span>
            <span>{itemCount}</span>
          </div>
          <div className="flex justify-between text-lg mb-2">
            <span>ราคา</span>
            <span>${Amount}</span>
          </div>
          <div className="flex justify-between text-lg mb-2 text-red-500">
            <span>ส่วนลด</span>
            <span>- ${discount}</span>
          </div>
          <div className="flex justify-between text-lg mt-4 font-bold">
            <span>รวมทั้งหมด</span>
            <span>${totalAmount}</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentDetail;