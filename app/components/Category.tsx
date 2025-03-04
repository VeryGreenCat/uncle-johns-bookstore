"use client";

import { useState } from "react";
import { Dropdown, MenuProps, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Category = () => {
  const categories: string[] = [
    "หมวดหมู่ทั้งหมด",
    "จิตวิทยา",
    "การ์ตูน",
    "นิยาย",
    "การเงินการลงทุน",
    "ประวัติศาสตร์",
    "ชีวประวัติ",
    "คู่มือเรียน-สอบ",
    "หนังสือเด็ก",
    "นิยายวาย",
    "พจนานุกรม",
    "นิตยาสาร",
    "ศิลปะ",
  ];

  const [selectedCategory, setSelectedCategory] =
    useState<string>("เลือกหมวดหมู่");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedCategory(e.key);
  };

  // Convert categories to `items` format
  const items: MenuProps["items"] = categories.map((category) => ({
    key: category,
    label: category,
  }));

  return (
    <div className="w-[250px] p-4">
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        trigger={["hover"]}
        placement="bottomLeft" // Always opens downward
        getPopupContainer={(triggerNode) =>
          triggerNode.parentElement as HTMLElement
        } // Prevents repositioning
        forceRender // Ensures dropdown renders even when hidden
      >
        <Button className="w-full h-[45px] text-lg flex justify-between items-center">
          {selectedCategory} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default Category;
