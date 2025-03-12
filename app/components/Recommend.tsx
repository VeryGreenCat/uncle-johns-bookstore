"use client";

import { Book } from "@prisma/client";
import { message } from "antd";
import { useState, useEffect } from "react";
import ShowBookContainer from "./ShowBookContainer";

const Recommend = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/book/getBook");
        const data = await res.json();
        if (res.ok) {
          const RecommendBooks = data.books.filter(
            (book: Book) => book.discount > 15
          );
          setBooks(RecommendBooks);
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
      <ShowBookContainer books={books} headerText={"Recommend"} />
    </>
  );
};
export default Recommend;
