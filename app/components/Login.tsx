"use client";

import { Button, Modal } from "antd";
import { useState } from "react";
import Link from "next/link";

import Image from "next/image";
import logo from "/public/media/images/uncle_johns_logo.png";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Login
      </Button>
      <Modal
        title="เข้าสู่ระบบ"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4 overflow-hidden">
            <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center text-gray-700 text-lg ">
              <Image src={logo} alt="Bookstore Logo" width={100} height={100} />
            </div>
          </div>

          {/* Username Input */}
          <div className="mb-3 text-left">
            <label className="block text-sm font-medium text-gray-700">
              ชื่อผู้ใช้งาน
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
              placeholder="ชื่อผู้ใช้งาน"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-700">
              รหัสผ่าน
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
              placeholder="รหัสผ่าน"
            />
          </div>

          {/* Login Button */}
          <button className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition">
            เข้าสู่ระบบ
          </button>

          {/* Signup Link */}
          <p className="mt-4 text-sm text-gray-700">
            สมัครสมาชิกใหม่ด้วยอีเมลล์{" "}
            <Link href="/register" className="text-red-500 font-semibold">
              สมัครที่นี่
            </Link>
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Login;
