"use client";

import { Button, Modal, Input, Form, message } from "antd";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/media/images/uncle_johns_logo_black.png";

const Login = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.getFieldValue("email"),
          password: form.getFieldValue("password"),
        }),
      });

      const serverResponse = await response.json();

      if (response.ok) {
        message.success(serverResponse.message);
        form.resetFields();
        setOpen(false);
      } else {
        message.error(serverResponse.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Login
      </Button>
      <Modal
        title="เข้าสู่ระบบ"
        open={open}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="text-center">
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

          <Form form={form} layout="vertical" onFinish={handleLogin}>
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

            {/* login Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
          </Form>

          {/* Signup Link */}
          <p className="mt-4 text-sm text-gray-700">
            สมัครสมาชิกใหม่ด้วยอีเมลล์{" "}
            <Link
              href="/register"
              className="text-red-500 font-semibold"
              onClick={handleCancel}
            >
              สมัครที่นี่
            </Link>
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Login;
