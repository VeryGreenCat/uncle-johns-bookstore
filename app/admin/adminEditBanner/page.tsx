"use client";
import { Button, Upload, Carousel, message, Modal } from "antd";
import { UploadOutlined, LeftOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import supabase from "@/utils/supabaseClient";
import Link from "next/link";

const AdminEditBanner = () => {
  const [banners, setBanners] = useState<string[]>([]);
  const [newBanners, setNewBanners] = useState<
    { file: File; preview: string }[]
  >([]);
  const carouselRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("book-images")
        .list("banners");
      if (error) throw error;

      const bannerUrls = data.map(
        (item) =>
          supabase.storage
            .from("book-images")
            .getPublicUrl(`banners/${item.name}`).data.publicUrl
      );

      setBanners(bannerUrls);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const handleUpload = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setNewBanners([...newBanners, { file, preview: previewUrl }]);
    return false; // ป้องกันไม่ให้ Upload อัปโหลดทันที
  };

  const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  const handleConfirmOk = async () => {
    try {
      for (const item of newBanners) {
        const { data, error } = await supabase.storage
          .from("book-images")
          .upload(`banners/${item.file.name}`, item.file);
        if (error) throw error;

        const urlData = supabase.storage
          .from("book-images")
          .getPublicUrl(data.path).data.publicUrl;
        setBanners((prev) => [...prev, urlData]);
      }
      setNewBanners([]);
      message.success("อัปโหลดแบนเนอร์สำเร็จ!");
    } catch (error) {
      console.error("Error uploading banners:", error);
    }
    setIsConfirmModalVisible(false);
  };

  const handleDeleteOk = async () => {
    const allBanners = [...banners, ...newBanners.map((item) => item.preview)];
    const imageUrl = allBanners[currentIndex];

    if (newBanners.some((item) => item.preview === imageUrl)) {
      setNewBanners((prev) => prev.filter((item) => item.preview !== imageUrl));
    } else {
      try {
        const filePath = imageUrl.split("book-images/")[1];
        const { error } = await supabase.storage
          .from("book-images")
          .remove([filePath]);
        if (error) throw error;
        setBanners((prev) => prev.filter((url) => url !== imageUrl));
      } catch (error) {
        console.error("Error deleting banner:", error);
      }
    }
    setIsDeleteModalVisible(false);
  };

  const previewBanners = [
    ...banners,
    ...newBanners.map((item) => item.preview),
  ];

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
      <div className="min-h-screen flex flex-col items-center p-4">
        <div className="flex-grow flex flex-col items-center w-full p-8">
          <div className="relative w-full h-48 md:h-72 rounded-3xl overflow-hidden">
            <Carousel
              autoplay
              afterChange={(current) => setCurrentIndex(current)}
              ref={carouselRef}
            >
              {previewBanners.length > 0 ? (
                previewBanners.map((src, index) => (
                  <div key={index} className="w-full h-48 md:h-72 bg-gray-300">
                    <img
                      src={src}
                      alt="Banner"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center w-full h-48 md:h-72 bg-gray-300">
                  Preview
                </div>
              )}
            </Carousel>
          </div>
          <Upload beforeUpload={handleUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />} className="mt-4">
              เลือกไฟล์รูปภาพ
            </Button>
          </Upload>
          {previewBanners.length > 0 && (
            <Button
              onClick={() => setIsDeleteModalVisible(true)}
              className="bg-red-600 text-white mt-4"
            >
              ลบ
            </Button>
          )}
          <Button
            className="bg-brown-700 text-white mt-4"
            onClick={showConfirmModal}
          >
            ยืนยันการแก้ไข
          </Button>
        </div>
        <Modal
          title="ยืนยันการเปลี่ยนแปลง?"
          open={isConfirmModalVisible}
          onOk={handleConfirmOk}
          onCancel={() => setIsConfirmModalVisible(false)}
        >
          <p>โปรดยืนยันว่าคุณต้องการเปลี่ยนแปลงแบนเนอร์</p>
        </Modal>
        <Modal
          title="ต้องการลบแบนเนอร์นี้หรือไม่?"
          open={isDeleteModalVisible}
          onOk={handleDeleteOk}
          onCancel={() => setIsDeleteModalVisible(false)}
        >
          <p>การลบแบนเนอร์จะไม่สามารถกู้คืนได้ คุณแน่ใจหรือไม่?</p>
        </Modal>
      </div>
    </div>
  );
};

export default AdminEditBanner;
