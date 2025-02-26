"use client";

import { DatePicker, Select, Form, Input, Button, Alert, message } from "antd";
import { useState } from "react";
import { User } from "@/utils/types";

const register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: User) => {
    console.log(values);
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setSuccess(true);
        message.success("Registration successful!");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Registration failed.");
        // <Alert message="Registration failed!" type="error" showIcon />;
        message.error("Registration failed!");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {success && (
        <Alert message="Registration successful!" type="success" showIcon />
      )}
      {error && <Alert message={error} type="error" showIcon />}

      <div className="bg-gray-200 p-8 my-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center text-gray-700 text-lg">
            logo
          </div>
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
                { value: "m", label: "ชาย" },
                { value: "f", label: "หญิง" },
                { value: "o", label: "อื่นๆ" },
              ]}
            />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            name="phoneNumber"
            label="เบอร์โทร"
            rules={[{ required: true, message: "กรุณากรอกเบอร์โทร" }]}
          >
            <Input placeholder="เบอร์โทร" />
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
