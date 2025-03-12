"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input, Checkbox, Spin } from "antd";
import BookCard from "../components/Book";
import { Book } from "@/utils/types";

const SearchResult = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleBookClick = (bookId: string) => {
    router.push(`/bookDetail?bookId=${bookId}`);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`/api/book/getBook`);
        const data = await response.json();
        if (Array.isArray(data.books)) {
          setBooks(data.books);
          setFilteredBooks(data.books);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = books;
    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategories.length) {
      filtered = filtered.filter((book) =>
        selectedCategories.includes(book.category.name)
      );
    }
    setFilteredBooks(filtered);
  }, [searchTerm, selectedCategories, books]);

  const handleCategoryChange = (checkedValues: string[]) => {
    setSelectedCategories(checkedValues);
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0] p-6">
      <div className="mb-4">
        <Input.Search
          placeholder="Search"
          className="w-64"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-6">
        <div className="w-[250px] bg-[#8B6C50] p-4 rounded-lg">
          <Checkbox.Group
            className="flex flex-col text-white text-lg"
            options={[...new Set(books.map((book) => book.category.name))]}
            onChange={handleCategoryChange}
            value={selectedCategories}
          />
        </div>
        <div className="flex-1 grid grid-cols-4 gap-6 bg-[#E9DFC4] p-6 rounded-lg">
          {loading ? (
            <Spin className="col-span-3" />
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book.bookId}
                className="cursor-pointer"
                onClick={() => handleBookClick(book.bookId)}
              >
                <BookCard {...book} />
              </div>
            ))
          ) : (
            <p className="text-center flex col-span-3 text-gray-500">
              ไม่พบหนังสือ
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
