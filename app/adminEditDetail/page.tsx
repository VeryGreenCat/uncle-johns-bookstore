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
import { Book } from "@prisma/client";
import supabase from "@/utils/supabaseClient";

const AdminEditDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [book, setBook] = useState<Omit<Book, "bookId" | "rating"> | null>(null);
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
    fetchCategory();
    fetchBookDetails();
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

  const fetchBookDetails = async () => {
  try {
    const res = await fetch("/api/book/getBook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: searchParams.get("bookId") }),
    });

    const data = await res.json();
    if (res.ok) {
      setBook(data.book);
      setPreviewImage(data.book.imageURL);
      form.setFieldsValue(data.book);
    } else {
      message.error("ไม่สามารถโหลดข้อมูลหนังสือได้");
    }
  } catch (error) {
    message.error("เกิดข้อผิดพลาดขณะโหลดข้อมูลหนังสือ");
  }
};


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Card
        title={<h2 className="text-xl font-semibold text-center">แก้ไขข้อมูลหนังสือ</h2>}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={book || {}}
        >
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4 flex flex-col items-center">
              <Avatar shape="square" size={150} src={previewImage || undefined} />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
              ย้อนกลับ
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AdminEditDetail;
