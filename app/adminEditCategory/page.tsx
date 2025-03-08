"use client";
import { useState } from "react";
import { Button, Select, Modal, Input, message } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LeftOutlined,
} from "@ant-design/icons";

const AdminEditCategory = () => {
  const [categories, setCategories] = useState(["สยองขวัญ", "นิยาย", "สารคดี"]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categories[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(
    null
  );
  const [newCategory, setNewCategory] = useState("");

  const showModal = (type: "add" | "edit" | "delete") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (modalType === "add" && newCategory) {
      setCategories([...categories, newCategory]);
      message.success("เพิ่มหมวดหมู่เสร็จสิ้น");
    } else if (modalType === "edit" && selectedCategory) {
      setCategories(
        categories.map((cat) => (cat === selectedCategory ? newCategory : cat))
      );
      message.success("แก้ไขหมวดหมู่เสร็จสิ้น");
    } else if (modalType === "delete" && selectedCategory) {
      setCategories(categories.filter((cat) => cat !== selectedCategory));
      setSelectedCategory(null);
      message.success("ลบหมวดหมู่เสร็จสิ้น");
    }
    setIsModalOpen(false);
    setNewCategory("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* ปุ่มย้อนกลับ */}
      <div className="relative w-full mb-24">
        <a href="/adminHomepage">
          <Button
            type="primary"
            icon={<LeftOutlined />}
            className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            กลับ
          </Button>
        </a>
      </div>
      <div className="w-full max-w-lg p-6">
        {/* กล่องปุ่มและ Dropdown */}
        <div className="flex justify-center items-center gap-6">
          {/* ปุ่ม (เพิ่ม, แก้ไข, ลบ) */}
          <div className="flex flex-col items-center space-y-4">
            <Button
              type="primary"
              className="bg-[#69321f] text-lg py-4 px-8 w-40"
              icon={<PlusOutlined />}
              onClick={() => showModal("add")}
            >
              เพิ่ม
            </Button>
            <Button
              type="default"
              className="text-lg py-4 px-8 w-40"
              icon={<EditOutlined />}
              onClick={() => showModal("edit")}
            >
              แก้ไข
            </Button>
            <Button
              type="primary"
              danger
              className="text-lg py-4 px-8 w-40"
              icon={<DeleteOutlined />}
              onClick={() => showModal("delete")}
            >
              ลบ
            </Button>
          </div>

          {/* Dropdown เลือกหมวดหมู่ */}
          <Select
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            className="w-56 h-12 text-lg text-center text-white"
          >
            {categories.map((category) => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={
          modalType === "add"
            ? "เพิ่มหมวดหมู่"
            : modalType === "edit"
            ? "แก้ไขหมวดหมู่"
            : "ลบหมวดหมู่"
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
      >
        {modalType === "add" && (
          <Input
            placeholder="ชื่อหมวดหมู่ใหม่"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        )}
        {modalType === "edit" && selectedCategory && (
          <Input
            placeholder="แก้ไขชื่อหมวดหมู่"
            defaultValue={selectedCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        )}
        {modalType === "delete" && (
          <p>คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่นี้?</p>
        )}
      </Modal>
    </div>
  );
};

export default AdminEditCategory;
