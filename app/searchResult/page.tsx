"use client";
import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import ShowBookContainer from "../components/ShowBookContainer";
import { BookProps } from "@/utils/props";
import SearchBar from "../components/SearchBar";

const SearchResult = () => {
  const [books, setBooks] = useState<BookProps[]>([]);
  const [searchLabel, setSearchLabel] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<BookProps[]>([]);

  useEffect(() => {
    // ดึงข้อมูลจาก localStorage
    const storedBooks = localStorage.getItem("books");
    const storedLabel = localStorage.getItem("searchLabel");

    if (storedBooks) {
      const parsedBooks = JSON.parse(storedBooks);
      setBooks(parsedBooks);
      setFilteredBooks(parsedBooks);
    }

    if (storedLabel) {
      setSearchLabel(storedLabel);
    }
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(
        books.filter((book) =>
          book.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="p-6 bg-[#E3C48D] min-h-screen">
      <div className="flex justify-between items-center mb-6 p-2">
        <h2 className="text-2xl font-bold w-5/6">ผลการค้นหา : {searchLabel}</h2>
        <div className="w-1/6">
          <SearchBar data={books.map((b) => b.title)} onSearch={handleSearch} />
        </div>
      </div>
      <div className="flex gap-6">
        <Filter books={books} onFilterChange={setFilteredBooks} />
        <div className="flex-1">
          <ShowBookContainer books={filteredBooks} headerText={searchLabel} />
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
