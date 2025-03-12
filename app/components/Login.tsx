"use client";

import { Button, Modal, Input, Form, message, Dropdown, MenuProps } from "antd";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/media/images/uncle_johns_logo_black.png";
import {
  HistoryOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSession, signIn, signOut } from "next-auth/react"; // FIX: Import NextAuth hooks
import { useSearchParams } from "next/navigation";

const Login = () => {
  const { data: session } = useSession(); // FIX: Use NextAuth session
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const showLoginModal = searchParams.get("requestLoginModal");

  const showModal = () => setOpen(true || showLoginModal === "true");
  const handleCancel = () => setOpen(false);

  const handleLogin = async () => {
    // FIX: Use NextAuth signIn
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password"),
      });

      if (response?.error) {
        message.error("Invalid email or password");
      } else {
        message.success("Login successful");
        form.resetFields();
        setOpen(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    signOut({
      callbackUrl: "/",
    });
    message.success("Logged out successfully");
  };

  const items: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link href="/profile">โปรไฟล์</Link>,
    },
    {
      key: "history",
      icon: <HistoryOutlined />,
      label: <Link href="/orderHistory">ประวัติการสั่งซื้อ</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "ออกจากระบบ",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      {session ? ( // FIX: Use session data to check authentication
        <Dropdown menu={{ items }} trigger={["hover"]}>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#E8D1A7] transition">
            <UserOutlined style={{ color: "white", fontSize: "1.3rem" }} />
          </button>
        </Dropdown>
      ) : (
        <Button type="primary" onClick={showModal}>
          Login
        </Button>
      )}

      <Modal
        title="เข้าสู่ระบบ"
        open={open}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="text-center">
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

            <Form.Item
              name="password"
              label="รหัสผ่าน"
              rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
            >
              <Input.Password placeholder="รหัสผ่าน" />
            </Form.Item>

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
