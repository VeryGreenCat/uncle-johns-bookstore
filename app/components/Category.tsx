"use client";

import { useEffect, useState } from "react";
import { Dropdown, MenuProps, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("เลือกหมวดหมู่");
  const [categories, setCategories] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category/getCategory");
        const data = await response.json();
        if (data.category && Array.isArray(data.category)) {
          setCategories(data.category.map((cat: any) => cat.name)); // ใช้ข้อมูลจาก API มาแทน
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedCategory(e.key);
    setOpen(false); 
  };

  const handleVisibleChange = (flag: boolean) => {
    setOpen(flag);
  };

  const items: MenuProps["items"] = categories.map((category) => ({
    key: category,
    label: category,
  }));

  return (
    <div className="w-[250px] p-4">
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        trigger={["click"]} 
        placement="bottomLeft"
        getPopupContainer={(triggerNode) =>
          triggerNode.parentElement as HTMLElement
        }
        open={open}
        onOpenChange={handleVisibleChange} 
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
          <span style={{ width: "20px", textAlign: "right" }}>
            <DownOutlined />
          </span>
        </Button>
      </Dropdown>
    </div>
  );
};

export default Category;
