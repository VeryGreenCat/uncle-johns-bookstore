"use client";
import { useEffect, useState } from "react";
import { Button, Modal, Select, Input, message } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Option } = Select;

const AdminEditCategory = () => {
  const router = useRouter();

  const [category, setCategory] = useState<
    { categoryId: number; name: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<{
    categoryId: number;
    name: string;
  } | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [actionType, setActionType] = useState<
    "add" | "edit" | "delete" | null
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await fetch("/api/category/getCategory");
      const data = await res.json();
      if (res.ok) {
        setCategory(data.category);
      } else {
        message.error("ไม่สามารถโหลดหมวดหมู่ได้");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดขณะโหลดหมวดหมู่");
    }
  };

  const showModal = (type: "add" | "edit" | "delete") => {
    setActionType(type);
    setIsModalVisible(true);
    setCategoryName(
      type === "edit" && selectedCategory ? selectedCategory.name : ""
    );
  };

  const handleOk = async () => {
    if (!actionType) return;
    setLoading(true);

    const url =
      actionType === "add"
        ? "/api/category/addCategory"
        : actionType === "edit"
        ? "/api/category/editCategory"
        : "/api/category/deleteCategory";

    const method =
      actionType === "add" ? "POST" : actionType === "edit" ? "PUT" : "DELETE";

    const body =
      actionType === "edit"
        ? JSON.stringify({
            oldName: selectedCategory?.name,
            newName: categoryName,
          })
        : JSON.stringify({
            name:
              actionType === "delete" ? selectedCategory?.name : categoryName,
          });

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      const data = await res.json();
      if (res.ok) {
        message.success(`${data.message}`);
        fetchCategory();
        setSelectedCategory(null);
      } else {
        message.error(`${data.error}`);
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดขณะทำรายการ");
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* ปุ่มกลับ */}
      <div className="relative w-full mb-4">
        <Link href="/admin/adminHomepage">
          <Button
            type="primary"
            icon={<LeftOutlined />}
            className="absolute text-white py-2 rounded-lg my-2"
          >
            กลับ
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center space-y-6 mt-10">
        <Select
          value={selectedCategory?.name || undefined}
          onChange={(value) => {
            const selected = category.find((c) => c.name === value);
            setSelectedCategory(selected || null);
          }}
          placeholder="เลือกหมวดหมู่"
          className="w-60"
        >
          {category.map((cat) => (
            <Option key={cat.categoryId} value={cat.name}>
              {cat.name}
            </Option>
          ))}
        </Select>

        <div className="flex space-x-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal("add")}
          >
            เพิ่ม
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal("edit")}
            disabled={!selectedCategory}
          >
            แก้ไข
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => showModal("delete")}
            disabled={!selectedCategory}
          >
            ลบ
          </Button>
        </div>

        <Modal
          title={`ยืนยัน${
            actionType === "add"
              ? "เพิ่ม"
              : actionType === "edit"
              ? "แก้ไข"
              : "ลบ"
          }หมวดหมู่`}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
          confirmLoading={loading}
          okText="ยืนยัน"
          cancelText="ยกเลิก"
        >
          {actionType === "delete" ? (
            <p>
              คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่ "{selectedCategory?.name}" ?
            </p>
          ) : (
            <Input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AdminEditCategory;
