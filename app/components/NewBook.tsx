"use client";

import { useEffect, useState } from "react";
import ShowBookContainer from "./ShowBookContainer";
import { message } from "antd";

const NewBook = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/book/getBook");
        const data = await res.json();
        if (res.ok) {
          setBooks(data.books);
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
      <ShowBookContainer books={books} headerText={"New Book"} />
    </>
  );
};
export default NewBook;
