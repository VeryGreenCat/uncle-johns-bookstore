"use client";

import { useState } from "react";

const register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    gender: "",
    phone: "",
    agreeTerms: false,
    receiveUpdates: false,
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center text-gray-700 text-lg">
            logo
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4">ลงทะเบียนเข้าใช้งาน</h2>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ชื่อ
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              นามสกุล
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            อีเมล
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
          />
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              รหัสผ่าน
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ยืนยันรหัสผ่าน
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Birthdate & Gender */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                วัน
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                เดือน
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ปี
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              เพศ
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            เบอร์โทร
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex items-center gap-2 mb-3">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-sm text-gray-700">
            ยอมรับเงื่อนไขและข้อตกลง
          </span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-sm text-gray-700">รับข่าวสารและโปรโมชั่น</span>
        </div>

        {/* Register Button */}
        <button className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition">
          ลงทะเบียน
        </button>
      </div>
    </div>
  );
};

export default register;
