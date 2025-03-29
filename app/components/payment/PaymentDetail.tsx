import { Card, Button, Select, Input, Form, message, Col, Row } from "antd";
import { useState, useEffect } from "react";

const { Option } = Select;

const PaymentDetail = ({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) => {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [cartSummary, setCartSummary] = useState({ quantity: 0, price: 0 });
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch addresses from API
        const response = await fetch("/api/address/getAddress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        });
        const data = await response.json();
        if (data && data.address) {
          // Split the string into individual addresses and filter empty values
          const addressList = data.address
            .split(";")
            .filter((addr: string) => addr.trim() !== "");
          setAddresses(addressList);
          setSelectedAddress(addressList[0] || "");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }

      // Fetch cart details
      try {
        const orderDetailRes = await fetch("/api/cart/getOrderDetail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
        const orderDetails = await orderDetailRes.json();

        if (Array.isArray(orderDetails)) {
          const totalQuantity = orderDetails.reduce(
            (acc: number, item: { quantity: number }) => acc + item.quantity,
            0
          );
          const totalPrice = orderDetails.reduce(
            (acc: number, item: { price: number }) => acc + item.price,
            0
          );
          setCartSummary({ quantity: totalQuantity, price: totalPrice });
        }
      } catch (error) {
        console.error("Error fetching cart details:", error);
      }
    };

    if (userId && userEmail) {
      fetchData();
    }
  }, [userId, userEmail]);

  const handleAddAddress = async (values: any) => {
    // Combine the address fields into one string.
    const newAddress = `${values.name} ${values.phoneNumber} ${values.address} ${values.subdistrict} ${values.district} ${values.province} ${values.zipcode}`;

    try {
      const response = await fetch("/api/address/addAddress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          addressName: values.addressName,
          addressDetails: newAddress,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error adding address:", errorData);
        return;
      }

      const data = await response.json();
      if (data.message === "Address added successfully!") {
        // Update the address list and select the new address
        setAddresses((prev) => [
          ...prev,
          values.addressName + " " + newAddress,
        ]);
        setSelectedAddress(values.addressName + " " + newAddress);
        form.resetFields();
        setShowForm(false);
        message.success("Address added successfully!");
      } else {
        console.error("Error adding address:", data.message);
      }
    } catch (error) {
      console.error("Error in handleAddAddress:", error);
    }
  };

  return (
    <div className="flex justify-between space-x-4 mb-4">
      <div className="w-3/5">
        <Card className="p-4 text-center">
          <span className="text-xl font-semibold">QR Code</span>
          {/* QR Code placeholder; insert your QR code image here */}
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
              // The first part of the address is the addressName
              const parts = addr.split(" ");
              const name = parts[0];
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
          <Button
            type="primary"
            className="mb-4"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "ยกเลิก" : "เพิ่มที่อยู่"}
          </Button>
          {showForm && (
            <Form
              form={form}
              onFinish={handleAddAddress}
              layout="vertical"
              className="mt-4"
            >
              <Form.Item
                name="addressName"
                label="ชื่อ ที่อยู่"
                rules={[
                  { required: true, message: "กรุณาตั้งชื่อ ที่อยู่" },
                  {
                    pattern: /^\S*$/,
                    message: "ห้ามมีช่องว่างในชื่อที่อยู่",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="ชื่อ นามสกุล"
                    rules={[
                      { required: true, message: "กรุณากรอกชื่อ นามสกุล" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phoneNumber"
                    label="เบอร์โทรศัพท์"
                    rules={[
                      { required: true, message: "กรุณากรอกเบอร์โทรศัพท์" },
                      {
                        pattern: /^\d{10}$/,
                        message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="address"
                label="ที่อยู่"
                rules={[{ required: true, message: "กรุณากรอกที่อยู่" }]}
              >
                <Input />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="subdistrict"
                    label="ตำบล/แขวง"
                    rules={[{ required: true, message: "กรุณากรอกตำบล/แขวง" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="district"
                    label="อำเภอ/เขต"
                    rules={[{ required: true, message: "กรุณากรอกอำเภอ/เขต" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="province"
                    label="จังหวัด"
                    rules={[{ required: true, message: "กรุณากรอกจังหวัด" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="zipcode"
                    label="รหัสไปรษณีย์"
                    rules={[
                      { required: true, message: "กรุณากรอกรหัสไปรษณีย์" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Button type="primary" htmlType="submit">
                บันทึกที่อยู่
              </Button>
            </Form>
          )}
        </Card>
      </div>
      <div className="w-1/4">
        <Card className="p-4">
          <div className="flex justify-between text-lg mb-2">
            <span>จำนวน</span>
            <span>{cartSummary.quantity}</span>
          </div>
          <div className="flex justify-between text-lg mt-4 font-bold">
            <span>รวมทั้งหมด</span>
            <span>{(cartSummary.price - 6.35).toFixed(2)} บาท</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentDetail;
