"use client";
import { useState } from "react";

interface SearchProps {
  data: string[];
  onSearch: (query: string) => void; // เพิ่ม prop เพื่อส่งค่าออกไป
}

const Search: React.FC<SearchProps> = ({ data, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // ส่งค่าค้นหาไปยัง parent component
  };

  return (
    <div className="w-full max-w-md mx-auto ">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="w-full p-2 border border-gray-300 rounded-xl"
      />
    </div>
  );
};

export default Search;
