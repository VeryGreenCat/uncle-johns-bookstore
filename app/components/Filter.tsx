"use client";
import { useState } from "react";
import { Select } from "antd";
import { BookProps } from "@/utils/props";

const Filter = ({
  books,
  onFilterChange,
}: {
  books: BookProps[];
  onFilterChange: (filtered: BookProps[]) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (type: string) => {
    setSelectedCategory(type);
    const filtered = type ? books.filter((book) => book.type === type) : books;
    onFilterChange(filtered);
  };

  return (
    <div className="w-1/4 h-3/4 p-4 bg-[#8B5A2B] text-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Filter</h3>
      <Select
        className="w-full"
        placeholder="Select Category"
        onChange={handleCategoryChange}
        value={selectedCategory || undefined}
      >
        <Select.Option value="">All Categories</Select.Option>
        {[...new Set(books.map((book) => book.type))].map((type) => (
          <Select.Option key={type} value={type}>
            {type}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default Filter;
