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
import { useRouter } from "next/navigation";
import { Book } from "@/utils/types";
import supabase from "@/utils/supabaseClient";

const AdminAddBook = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [book, setBook] = useState<Omit<Book, "bookId" | "rating">>({
    name: "",
    author: "",
    publisher: "",
    bookDetails: "",
    price: 0,
    discount: 0,
    quantity: 0,
    imageURL:
      "https://dummyimage.com/150x150/ffffff/000000&text=please+select+img",
    category: { name: "", categoryId: "" },
  });
  const [previewImage, setPreviewImage] = useState<string | null>(
    book.imageURL || null
  );
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

  const handleUpload = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
    setFileName(file.name);
    setFile(file);
  };

  // Reset form when component mounts
  useEffect(() => {
    form.setFieldsValue(book);
  }, [book, form]);

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

  const handleFinish = async (values: Omit<Book, "bookId" | "rating">) => {
    setLoading(true);

    try {
      if (!file) {
        message.error("กรุณาเลือกรูปภาพ");
        throw new Error("No file selected for upload.");
      }

      const { data, error } = await supabase.storage
        .from("book-images")
        .upload(`books/${fileName}`, file);
      if (error) throw error;

      values.imageURL = supabase.storage
        .from("book-images")
        .getPublicUrl(data.path).data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    try {
      const response = await fetch("/api/book/addBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const serverResponse = await response.json();

      if (response.ok) {
        message.success(serverResponse.message);
        form.resetFields();
        setPreviewImage(null);
        setFileName("");
      } else {
        await supabase.storage
          .from("book-images")
          .remove([`books/${fileName}`]);
        message.error(serverResponse.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("An unknown error occurred.");
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
          initialValues={book}
          onFinish={handleFinish}
        >
          <div className="grid grid-cols-12 gap-6">
            {/* Book Image Upload */}
            <div className="col-span-4 flex flex-col items-center">
              <Avatar
                shape="square"
                size={150}
                src={
                  previewImage &&
                  previewImage !==
                    "https://dummyimage.com/150x150/ffffff/000000&text=please+select+img"
                    ? previewImage
                    : undefined
                }
                icon={
                  previewImage ===
                    "https://dummyimage.com/150x150/ffffff/000000&text=please+select+img" &&
                  !file ? (
                    <FileImageOutlined />
                  ) : null
                }
                className="border border-gray-300 bg-gray-100"
              />
              {fileName && (
                <p className="my-2 text-sm text-gray-500">{fileName}</p>
              )}
              {/* Show file name */}
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

            {/* Book Details */}
            <div className="col-span-8 space-y-3">
              <Form.Item
                name="bookId"
                label="รหัสหนังสือ"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัสหนังสือ",
                  },
                ]}
              >
                <Input placeholder="กรุณากรอกรหัสหนังสือ เช่น bk001" />
              </Form.Item>
              <Form.Item
                name="name"
                label="ชื่อเรื่อง"
                rules={[{ required: true, message: "กรุณากรอกชื่อเรื่อง" }]}
              >
                <Input placeholder="กรุณากรอกชื่อเรื่อง" />
              </Form.Item>
              <Form.Item
                name="author"
                label="ชื่อผู้แต่ง"
                rules={[{ required: true, message: "กรุณากรอกชื่อผู้แต่ง" }]}
              >
                <Input placeholder="กรุณากรอกชื่อผู้แต่ง" />
              </Form.Item>
              <Form.Item
                name="publisher"
                label="สำนักพิมพ์"
                rules={[{ required: true, message: "กรุณากรอกชื่อสำนักพิมพ์" }]}
              >
                <Input placeholder="กรุณากรอกชื่อสำนักพิมพ์" />
              </Form.Item>
              <Form.Item
                name="categoryId"
                label="หมวดหมู่"
                rules={[{ required: true, message: "กรุณากรอกหมวดหมู่" }]}
              >
                <Select
                  value={selectedCategory?.categoryId || undefined} // Store categoryId here
                  onChange={(value) => {
                    const selected = category.find(
                      (c) => c.categoryId === value
                    );
                    setSelectedCategory(selected || null); // Store the full selected category object
                  }}
                  placeholder="เลือกหมวดหมู่"
                  className="w-60"
                >
                  {category.map((cat) => (
                    <Select.Option key={cat.categoryId} value={cat.categoryId}>
                      {cat.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="bookDetails"
                label="เรื่องย่อ"
                rules={[{ required: true, message: "กรุณากรอกเรื่องย่อ" }]}
              >
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
                  className="flex-1"
                >
                  <InputNumber
                    min={1} // Ensure the minimum value is 1
                    className="w-full"
                    placeholder="กรุณากรอกราคา"
                    addonAfter="บาท"
                  />
                </Form.Item>
                <Form.Item
                  name="discount"
                  label="ลดราคา"
                  rules={[{ required: true, message: "กรุณากรอกส่วนลด" }]}
                  className="flex-1"
                >
                  <InputNumber
                    min={0}
                    className="w-full"
                    placeholder="กรุณากรอกส่วนลด"
                    addonAfter="%"
                  />
                </Form.Item>
                <Form.Item
                  name="quantity"
                  label="จำนวน"
                  rules={[
                    { required: true, message: "กรุณากรอกจำนวนหนังสือ" },
                    {
                      validator: (_, value) =>
                        value > 0
                          ? Promise.resolve()
                          : Promise.reject("จำนวนไม่สามารถเป็น 0"),
                    },
                  ]}
                  className="flex-1"
                >
                  <InputNumber
                    min={0}
                    className="w-full"
                    placeholder="กรุณากรอกจำนวนหนังสือ"
                    addonAfter="เล่ม"
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          {/* Buttons */}
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

export default AdminAddBook;
