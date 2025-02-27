"use client";
import { Button, Upload, Carousel, message, Modal } from "antd";
import { UploadOutlined, LeftOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";

const AdminEditBanner = () => {
  const [banners, setBanners] = useState<string[]>([]);
  const carouselRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false); // Popup ยืนยันแก้ไข
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Popup ยืนยันลบ

  const handleUpload = (file: any) => {
    const url = URL.createObjectURL(file);
    setBanners([...banners, url]);
    return false;
  };

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

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteOk = () => {
    setBanners((prev) => prev.filter((_, index) => index !== currentIndex));
    message.success("ลบแบนเนอร์สำเร็จ");
    setIsDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      {/* ปุ่มย้อนกลับ */}
      <div className="relative w-full">
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

      {/* Banner Editor */}
      <div className="flex-grow flex flex-col items-center rounded-3xl w-full p-8">
        <div className="relative w-full h-48 md:h-72">
          <Carousel
            autoplay
            className="rounded-lg overflow-hidden"
            afterChange={(current) => setCurrentIndex(current)}
            ref={carouselRef}
          >
            {banners.length > 0 ? (
              banners.map((src, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center w-full h-48 md:h-72 bg-gray-300 relative"
                >
                  <img src={src} alt="Banner" className="h-full object-cover" />
                </div>
              ))
            ) : (
              <div className="flex items-center text-center justify-center w-full h-48 md:h-72 bg-gray-300 text-lg font-semibold">
                Preview
              </div>
            )}
          </Carousel>
        </div>

        <div className="">
          <Upload beforeUpload={handleUpload} showUploadList={false}>
            <Button
              icon={<UploadOutlined />}
              className="bg-brown-600 text-white px-6 py-3 rounded-lg mt-4"
            >
              เลือกไฟล์รูปภาพ
            </Button>
          </Upload>
          {banners.length > 0 && (
            <Button
              onClick={showDeleteModal}
              className="bg-red-600 text-white px-6 py-2 rounded-lg mt-4 ml-4"
            >
              ลบ
            </Button>
          )}
        </div>

        {/* ปุ่มเปิด Popup ยืนยันการแก้ไข */}
        <Button
          className="bg-brown-700 text-white px-6 py-2 rounded-lg mt-4 mx-4"
          onClick={showConfirmModal}
        >
          ยืนยันการแก้ไข
        </Button>
      </div>

      {/* Popup ยืนยันการแก้ไข */}
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
        <p>โปรดยืนยันว่าคุณต้องการเปลี่ยนแปลงแบนเนอร์</p>
      </Modal>

      {/* Popup ยืนยันการลบ */}
      <Modal
        title="ต้องการลบแบนเนอร์นี้หรือไม่?"
        open={isDeleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        footer={[
          <Button
            key="cancel"
            onClick={handleDeleteCancel}
            className="bg-gray-500 text-white"
          >
            ยกเลิก
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={handleDeleteOk}
            className="bg-red-600"
          >
            ลบ
          </Button>,
        ]}
      >
        <p>การลบแบนเนอร์จะไม่สามารถกู้คืนได้ คุณแน่ใจหรือไม่?</p>
      </Modal>
    </div>
  );
};

export default AdminEditBanner;
