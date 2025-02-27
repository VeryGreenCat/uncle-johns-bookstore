"use client";

import { useState } from "react";
import { Card, Input, Button, Avatar, Rate, message, Modal } from "antd";
import {
  EditOutlined,
  UploadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { TextArea } = Input;

const AdminEditDetail = () => {
  const router = useRouter();

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false); // Popup ยืนยันแก้ไข
  const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  const handleConfirmOk = () => {
    message.success("ยืนยันการเปลี่ยนแปลงสำเร็จ!");
    setIsConfirmModalVisible(false);
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalVisible(false);
  };
  const [book, setBook] = useState({
    title: "XXXXXXXXXX",
    author: "XXXXXXXXXX",
    editor: "XXXXXXXXXX",
    publisher: "XXXXXXXXXX",
    category: "XXXXXXXXXX",
    pages: "XXX",
    summary: "รายละเอียดเรื่องย่อ...",
    price: 999.99,
    discount: "",
    quantity: 999,
    rating: 4,
    image: "https://via.placeholder.com/150",
  });

  const handleChange = (field: string, value: string | number) => {
    setBook({ ...book, [field]: value });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Card
        title={
          <h2 className="text-xl font-semibold text-center">
            แก้ไขข้อมูลหนังสือ
          </h2>
        }
      >
        <div className="grid grid-cols-12 gap-6">
          {/* รูปหนังสือ */}
          <div className="col-span-4 flex flex-col items-center">
            <Avatar shape="square" size={150} src={book.image} />
            <Button icon={<UploadOutlined />} className="mt-4">
              เลือกไฟล์รูปภาพ
            </Button>
          </div>

          {/* รายละเอียดหนังสือ */}
          <div className="col-span-8 space-y-3">
            {[
              { label: "ชื่อเรื่อง", key: "title" },
              { label: "ชื่อผู้แต่ง", key: "author" },
              { label: "บรรณาธิการ", key: "editor" },
              { label: "สำนักพิมพ์", key: "publisher" },
              { label: "หมวดหมู่", key: "category" },
              { label: "จำนวนหน้า", key: "pages", type: "number" },
            ].map(({ label, key, type }) => (
              <div key={key} className="flex items-center">
                <span className="w-28 font-semibold">{label}:</span>
                <Input
                  type={type || "text"}
                  value={book[key as keyof typeof book]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="flex-1"
                />
              </div>
            ))}

            {/* เรื่องย่อ */}
            <div className="flex items-start">
              <span className="w-28 font-semibold mt-1">เรื่องย่อ:</span>
              <TextArea
                rows={3}
                value={book.summary}
                onChange={(e) => handleChange("summary", e.target.value)}
                className="flex-1"
              />
            </div>

            {/* คะแนนรีวิว */}
            <div className="flex items-center">
              <span className="w-28 font-semibold">คะแนนรีวิว:</span>
              <Rate disabled value={book.rating} className="ml-2" />
            </div>

            {/* ราคา */}
            <div className="flex items-center">
              <span className="w-28 font-semibold">ราคา:</span>
              <Input
                type="number"
                value={book.price}
                onChange={(e) =>
                  handleChange("price", parseFloat(e.target.value))
                }
                className="w-24"
              />
            </div>

            {/* ลดราคา */}
            <div className="flex items-center">
              <span className="w-28 font-semibold">ลดราคา:</span>
              <Input
                type="number"
                value={book.discount}
                onChange={(e) => handleChange("discount", e.target.value)}
                className="w-24"
              />
            </div>

            {/* จำนวนสินค้า */}
            <div className="flex items-center">
              <span className="w-28 font-semibold">จำนวน:</span>
              <Input
                type="number"
                value={book.quantity}
                onChange={(e) =>
                  handleChange("quantity", parseInt(e.target.value))
                }
                className="w-24"
              />
            </div>
          </div>
        </div>

        {/* ปุ่มกด */}
        <div className="flex justify-between mt-6">
          <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
            ย้อนกลับ
          </Button>
          <Modal
            title="ต้องการยืนยันการเปลี่ยนแปลงหรือไม่?"
            open={isConfirmModalVisible}
            onOk={handleConfirmOk}
            onCancel={handleConfirmCancel}
            footer={[
              <Button
                key="cancel"
                onClick={handleConfirmCancel}
                className="bg-gray-500 text-white"
              >
                ยกเลิก
              </Button>,
              <Button
                key="ok"
                type="primary"
                onClick={handleConfirmOk}
                className="bg-brown-600"
              >
                ยืนยัน
              </Button>,
            ]}
          >
            <p>โปรดยืนยันว่าคุณต้องการเปลี่ยนแปลงข้อมูล</p>
          </Modal>
          <Button type="primary" onClick={showConfirmModal}>
            บันทึกข้อมูล
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminEditDetail;
