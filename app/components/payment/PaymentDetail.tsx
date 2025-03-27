import { Card, Button, Select, Modal, Input, message } from "antd";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    addressName: "",
    addressDetail: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
  });

  useEffect(() => {
  const fetchAddresses = async () => {
    try {
      const userEmail = "test@example.com"; // เปลี่ยนเป็นค่าจริง
      const userId = await getUserId(userEmail);

      if (!userId) {
        throw new Error("User ID not found");
      }

      const response = await fetch("/api/address/getAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch addresses: ${response.statusText}`);
      }

      const text = await response.text();
      console.log("Response from API:", text); // เพิ่มเพื่อดูข้อมูลที่ตอบกลับจาก API
      const data = text ? JSON.parse(text) : { addresses: [] };

      if (data.addresses && Array.isArray(data.addresses)) {
        setAddresses(data.addresses);
        setSelectedAddress(data.addresses.length > 0 ? data.addresses[0].full : "");
      } else {
        throw new Error("No addresses found");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error.message);
      message.error(`Error: ${error.message}`);
    }
  };

  fetchAddresses();
}, []);


  const handleAddAddress = async () => {
    try {
      const userEmail = "test@example.com"; // เปลี่ยนเป็นค่าจริง
      await fetch("/api/address/addAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, ...form }),
      });

      setIsModalOpen(false);
      setForm({
        addressName: "",
        addressDetail: "",
        subDistrict: "",
        district: "",
        province: "",
        postalCode: "",
      });

      // Refresh address list
      const userId = await getUserId(userEmail);
      const response = await fetch("/api/address/getAddress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : { addresses: [] };
      if (data.addresses) {
        setAddresses(data.addresses);
        setSelectedAddress(
          data.addresses.length > 0 ? data.addresses[0].full : ""
        );
      }
    } catch (error) {
      console.error("Error adding address:", error);
      message.error("An error occurred while adding the address.");
    }
  };

  return (
    <div className="flex justify-between space-x-4 mb-4">
      <div className="w-3/5">
        <Card className="p-4 text-center">
          <span className="text-xl font-semibold">QR Code</span>
        </Card>
        <Card className="p-4 mt-4">
          <span className="block font-bold mb-2">ที่อยู่</span>
          <Select
            className="mb-2 w-full"
            value={selectedAddress}
            onChange={setSelectedAddress}
          >
            {addresses.map((addr, index) => (
              <Option key={index} value={addr.full}>
                {addr.name}
              </Option>
            ))}
          </Select>
          <span className="block my-2 p-2">{selectedAddress}</span>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            เพิ่มที่อยู่
          </Button>
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
      <Modal
        title="เพิ่มที่อยู่"
        open={isModalOpen}
        onOk={handleAddAddress}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="mb-2">
          <Input
            placeholder="ชื่อที่อยู่"
            value={form.addressName}
            onChange={(e) => setForm({ ...form, addressName: e.target.value })}
          />
          {form.addressName === "" && (
            <span className="text-red-500">กรุณากรอกชื่อที่อยู่</span>
          )}
        </div>
        <div className="mb-2">
          <Input
            placeholder="ที่อยู่"
            value={form.addressDetail}
            onChange={(e) =>
              setForm({ ...form, addressDetail: e.target.value })
            }
          />
          {form.addressDetail === "" && (
            <span className="text-red-500">กรุณากรอกที่อยู่</span>
          )}
        </div>
        <div className="mb-2">
          <Input
            placeholder="ตำบล/แขวง"
            value={form.subDistrict}
            onChange={(e) => setForm({ ...form, subDistrict: e.target.value })}
          />
          {form.subDistrict === "" && (
            <span className="text-red-500">กรุณากรอกตำบล/แขวง</span>
          )}
        </div>
        <div className="mb-2">
          <Input
            placeholder="อำเภอ/เขต"
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
          />
          {form.district === "" && (
            <span className="text-red-500">กรุณากรอกอำเภอ/เขต</span>
          )}
        </div>
        <div className="mb-2">
          <Input
            placeholder="จังหวัด"
            value={form.province}
            onChange={(e) => setForm({ ...form, province: e.target.value })}
          />
          {form.province === "" && (
            <span className="text-red-500">กรุณากรอกจังหวัด</span>
          )}
        </div>
        <div className="mb-2">
          <Input
            placeholder="รหัสไปรษณีย์"
            value={form.postalCode}
            onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
          />
          {form.postalCode === "" && (
            <span className="text-red-500">กรุณากรอกรหัสไปรษณีย์</span>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PaymentDetail;
