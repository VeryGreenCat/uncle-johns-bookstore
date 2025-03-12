"use client";

import { useEffect, useState } from "react";
import ShowBookContainer from "./ShowBookContainer";
import { message } from "antd";
import { Book } from "@prisma/client";

const OnSale = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/book/getBook");
        const data = await res.json();
        if (res.ok) {
          const onSaleBooks = data.books.filter(
            (book: Book) => book.discount > 0
          );
          onSaleBooks.sort(
            (book1: { discount: number }, book2: { discount: number }) =>
              book1.discount - book2.discount
          );
          setBooks(onSaleBooks.slice(-10).reverse());
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
      <ShowBookContainer books={books} headerText={"On Sale"} />
    </>
  );
};

export default OnSale;
