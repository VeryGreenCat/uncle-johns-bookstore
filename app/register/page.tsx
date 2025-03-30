"use client";

import { DatePicker, Select, Form, Input, Button, message } from "antd";
import { useState } from "react";
import { User } from "@/utils/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "/public/media/images/uncle_johns_logo_black.png";

const register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: User) => {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const serverResponse = await response.json();

      if (response.ok) {
        message.success(serverResponse.message);
        router.push("/");
      } else {
        message.error(serverResponse.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.error("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-8 my-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src={logo}
            alt="Bookstore Logo"
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
        </div>

        <h2 className="text-xl font-bold mb-4">ลงทะเบียนเข้าใช้งาน</h2>

        {/* Form Start */}
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Name */}
          <Form.Item
            name="name"
            label="ชื่อ"
            rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
          >
            <Input placeholder="ชื่อ" />
          </Form.Item>

          <Form.Item
            name="surname"
            label="นามสกุล"
            rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
          >
            <Input placeholder="นามสกุล" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="อีเมล"
            rules={[
              {
                required: true,
                type: "email",
                message: "กรุณากรอกอีเมลที่ถูกต้อง",
              },
            ]}
          >
            <Input placeholder="อีเมล" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label="รหัสผ่าน"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
          >
            <Input.Password placeholder="รหัสผ่าน" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="ยืนยันรหัสผ่าน"
            dependencies={["password"]}
            rules={[
              { required: true, message: "กรุณายืนยันรหัสผ่าน" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return value && value === getFieldValue("password")
                    ? Promise.resolve()
                    : Promise.reject(new Error("รหัสผ่านไม่ตรงกัน"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="ยืนยันรหัสผ่าน" />
          </Form.Item>

          {/* Birthdate & Gender */}
          <Form.Item
            name="birthday"
            label="วันเดือนปีเกิด"
            rules={[{ required: true, message: "กรุณาเลือกวันเกิด" }]}
          >
            <DatePicker
              placeholder="dd/mm/yyyy"
              format={"DD/MM/YYYY"}
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="เพศ"
            rules={[{ required: true, message: "กรุณาเลือกเพศ" }]}
          >
            <Select
              placeholder="เลือกเพศ"
              options={[
                { value: "ชาย", label: "ชาย" },
                { value: "หญิง", label: "หญิง" },
                { value: "อื่นๆ", label: "อื่นๆ" },
              ]}
            />
          </Form.Item>

          {/* Phone Number */}
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
            <Input placeholder="0899999999" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              ลงทะเบียน
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default register;
