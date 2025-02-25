"use client";

import { DatePicker } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const register = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    gender: "",
    phoneNumber: "",
    agreeTerms: false,
    receiveUpdates: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setForm((prevForm) => ({
      ...prevForm,
      birthday: date ? date.toISOString() : "", // Convert to ISO string for Prisma
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!form.agreeTerms) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              นามสกุล
            </label>
            <input
              type="text"
              name="surname"
              value={form.surname}
              onChange={handleChange}
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
            name="email"
            value={form.email}
            onChange={handleChange}
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
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ยืนยันรหัสผ่าน
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Birthdate & Gender */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700">
              วันเดือนปีเกิด
            </label>
            <DatePicker
              onChange={handleDateChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none text-center"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              เพศ
            </label>
            <input
              type="text"
              name="gender"
              value={form.gender}
              onChange={handleChange}
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
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={form.agreeTerms}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700">
            ยอมรับเงื่อนไขและข้อตกลง
          </span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            name="receiveUpdates"
            checked={form.receiveUpdates}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700">รับข่าวสารและโปรโมชั่น</span>
        </div>

        {/* Register Button */}
        <button
          className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition"
          onClick={handleSubmit}
        >
          ลงทะเบียน
        </button>
      </div>
    </div>
  );
};

export default register;
