"use client";

import { Book } from "@/utils/types";
import { message } from "antd";
import { useState, useEffect } from "react";
import ShowBookContainer from "./ShowBookContainer";

const GoodBook = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/book/getBook");
        const data = await res.json();
        if (res.ok) {
          const GoodBook = data.books.filter(
            (book: Book) => book.rating && book.rating >= 4
          );
          setBooks(GoodBook);
        } else {
          message.error("ไม่สามารถโหลดข้อมูลหนังสือ");
        }
      } catch (error) {
        message.error("เกิดข้อผิดพลาดขณะดึงข้อมูลหนังสือ");
      } finally {
      }
    };

    fetchBooks(); // Call the function
  }, []);

  return (
    <>
      <ShowBookContainer books={books} headerText={"Good Book"} />
    </>
  );
};
export default GoodBook;
