"use client";

import { useEffect, useState } from "react";
import { Dropdown, MenuProps, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const Category = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("เลือกหมวดหมู่");
  const [categories, setCategories] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category/getCategory");
        const data: { category?: { name: string }[] } = await response.json();
        setCategories(data.category?.map((cat) => cat.name) || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedCategory(e.key);
    setOpen(false);

    // Navigate with query parameter
    router.push(`/searchResult?category=${encodeURIComponent(e.key)}`);
  };

  return (
    <div className="w-[250px] p-4">
      <Dropdown
        menu={{
          items: categories.map((category) => ({
            key: category,
            label: category,
          })),
          onClick: handleMenuClick,
        }}
        trigger={["click"]}
        placement="bottomLeft"
        getPopupContainer={(triggerNode) =>
          triggerNode.parentElement || document.body
        }
        open={open}
        onOpenChange={setOpen}
      >
        <Button
          style={{
            backgroundColor: "#743014",
            color: "white",
            borderColor: "#743014",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 12px",
          }}
          className="w-full h-[45px] text-lg flex items-center hover:bg-[#5a2710]"
        >
          <span className="flex-1 text-center">{selectedCategory}</span>
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default Category;
