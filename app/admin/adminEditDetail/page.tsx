"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  message,
  Upload,
  InputNumber,
  Select,
} from "antd";
import {
  UploadOutlined,
  ArrowLeftOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { Book } from "@/utils/types";
import supabase from "@/utils/supabaseClient";

const AdminEditDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const bookId = searchParams.get("bookId");
  const [book, setBook] = useState<Omit<Book, "rating"> | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<
    { categoryId: number; name: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<{
    categoryId: number;
    name: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bookId) {
      fetchBookDetails(bookId);
    }
    fetchCategory();
  }, [bookId]);

  const fetchBookDetails = async (bookId: string) => {
    try {
      const res = await fetch("/api/book/getEachBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      const data = await res.json();
      if (res.ok) {
        setBook(data.book);
        setPreviewImage(data.book.imageURL);
        setSelectedCategory({
          categoryId: data.book.categoryId,
          name: data.book.categoryName,
        });
        form.setFieldsValue(data.book);
      } else {
        message.error("ไม่สามารถโหลดข้อมูลหนังสือได้");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดขณะโหลดข้อมูลหนังสือ");
    }
  };

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

  const handleUpload = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
    setFileName(file.name);
    setFile(file);
  };

  const handleFinish = async (values: Omit<Book, "rating">) => {
    setLoading(true);

    try {
      if (file) {
        const { data, error } = await supabase.storage
          .from("book-images")
          .upload(`books/${fileName}`, file, { upsert: true });

        if (error) throw error;

        values.imageURL = supabase.storage
          .from("book-images")
          .getPublicUrl(data.path).data.publicUrl;
      }

      if (bookId) {
        values.bookId = bookId; // เพิ่ม bookId สำหรับการอัปเดต
      }

      const response = await fetch("/api/book/editBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const serverResponse = await response.json();

      if (response.ok) {
        message.success(serverResponse.message);
        router.push("/admin/adminStockManagement");
      } else {
        message.error(serverResponse.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("เกิดข้อผิดพลาดขณะอัปเดตหนังสือ");
      }
    } finally {
      setLoading(false);
    }
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
        <Form
          form={form}
          layout="vertical"
          initialValues={book || {}}
          onFinish={handleFinish}
        >
          <div className="grid grid-cols-12 gap-6">
            {/* รูปภาพหนังสือ */}
            <div className="col-span-4 flex flex-col items-center">
              <Avatar
                shape="square"
                size={150}
                src={previewImage || undefined}
                icon={!previewImage ? <FileImageOutlined /> : null}
                className="border border-gray-300 bg-gray-100"
              />
              {fileName && (
                <p className="my-2 text-sm text-gray-500">{fileName}</p>
              )}
              <Form.Item>
                <Upload
                  maxCount={1}
                  listType="picture"
                  showUploadList={false}
                  accept=".jpg, .jpeg, .png"
                  beforeUpload={handleUpload}
                >
                  <Button icon={<UploadOutlined />}>เลือกไฟล์รูปภาพ</Button>
                </Upload>
              </Form.Item>
            </div>

            {/* ข้อมูลหนังสือ */}
            <div className="col-span-8 space-y-3">
              <Form.Item name="name" label="ชื่อเรื่อง">
                <Input placeholder="กรุณากรอกชื่อเรื่อง" />
              </Form.Item>
              <Form.Item name="author" label="ชื่อผู้แต่ง">
                <Input placeholder="กรุณากรอกชื่อผู้แต่ง" />
              </Form.Item>
              <Form.Item name="publisher" label="สำนักพิมพ์">
                <Input placeholder="กรุณากรอกชื่อสำนักพิมพ์" />
              </Form.Item>
              <Form.Item name="categoryId" label="หมวดหมู่">
                <Select
                  value={selectedCategory?.categoryId || undefined}
                  onChange={(value) => {
                    const selected = category.find(
                      (c) => c.categoryId === value
                    );
                    setSelectedCategory(selected || null);
                  }}
                  placeholder="เลือกหมวดหมู่"
                >
                  {category.map((cat) => (
                    <Select.Option key={cat.categoryId} value={cat.categoryId}>
                      {cat.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="bookDetails" label="เรื่องย่อ">
                <TextArea rows={3} placeholder="กรุณากรอกเรื่องย่อ" />
              </Form.Item>
              <div className="flex gap-4">
                <Form.Item
                  name="price"
                  label="ราคา"
                  rules={[
                    { required: true, message: "กรุณากรอกราคา" },
                    {
                      validator: (_, value) =>
                        value > 0
                          ? Promise.resolve()
                          : Promise.reject("ราคาไม่สามารถเป็น 0"),
                    },
                  ]}
                >
                  <InputNumber min={1} className="w-full" addonAfter="บาท" />
                </Form.Item>
                <Form.Item name="discount" label="ลดราคา">
                  <InputNumber min={0} className="w-full" addonAfter="%" />
                </Form.Item>
                <Form.Item name="quantity" label="จำนวน">
                  <InputNumber min={0} className="w-full" addonAfter="เล่ม" />
                </Form.Item>
              </div>
            </div>
          </div>

          {/* ปุ่ม */}
          <div className="flex justify-between mt-6">
            <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
              ย้อนกลับ
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              บันทึกข้อมูล
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AdminEditDetail;
