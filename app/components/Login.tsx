"use client";

import { Button, Modal, Input, Form } from "antd";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/media/images/uncle_johns_logo.png";

const Login = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

      const data = await response.json();

      if (response.ok) {
        alert("เข้าสู่ระบบสำเร็จ!");
        form.resetFields(); // Clear input fields after success
        setOpen(false);
      } else {
        alert(data.error || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="bg-red-500 hover:bg-red-600"
      >
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
          <div className="flex justify-center mb-4">
            <Image
              src={logo}
              alt="Bookstore Logo"
              width={100}
              height={100}
              className="rounded-full"
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

            {/* Submit Button */}
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

          {/* Login Button */}
          {/* <Button
            type="primary"
            onClick={handleLogin}
            className="w-full bg-red-500 hover:bg-red-600 h-10 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spin size="small" /> : "เข้าสู่ระบบ"}
          </Button> */}

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
