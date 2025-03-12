"use client";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ ใช้ router
import BookCard from "./Book";
import { Book } from "@/utils/types";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

const ShowBookContainer = ({
  books,
  headerText,
}: {
  books: Book[];
  headerText: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // ✅ สร้าง router
  const [isTransitioning, setIsTransitioning] = useState(false);

  const visibleBooks = 10; // จำนวนเล่มที่แสดงต่อหน้า

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollLeft = 0; // เริ่มต้นที่ตำแหน่งแรก
  }, []);

  const handleScroll = (direction: "next" | "prev") => {
    if (!containerRef.current || isTransitioning) return;
    setIsTransitioning(true);

    const scrollAmount = containerRef.current.clientWidth;
    const maxScrollLeft =
      containerRef.current.scrollWidth - containerRef.current.clientWidth;

    if (direction === "next") {
      if (containerRef.current.scrollLeft + scrollAmount >= maxScrollLeft) {
        containerRef.current.scrollTo({ left: 0, behavior: "instant" });
      }
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      if (containerRef.current.scrollLeft <= 0) {
        containerRef.current.scrollTo({
          left: maxScrollLeft,
          behavior: "instant",
        });
      }
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }

    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleBookClick = (bookId: string) => {
    router.push(`/bookDetail?bookId=${bookId}`);
  };

  return (
    <div className="relative p-4 bg-[#ECE1CC] rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{headerText}</h2>
      </div>

      <div className="relative flex items-center mt-4">
        <button
          onClick={() => handleScroll("prev")}
          className="absolute left-0 z-10 bg-[#743014] w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-[#472111] text-white transition"
        >
          <DoubleLeftOutlined />
        </button>

        <div className="w-full overflow-hidden">
          <div
            ref={containerRef}
            className="flex gap-4 flex-nowrap overflow-x-scroll scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {books.map((book, index) => (
              <div
                key={`${book.bookId}-${index}`}
                className="flex-none w-1/5 min-w-[20%] cursor-pointer"
                onClick={() => handleBookClick(book.bookId)} // ✅ กดแล้วไปหน้า BookDetail
              >
                <BookCard {...book} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleScroll("next")}
          className="absolute right-0 z-10 bg-[#743014] w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-[#472111] text-white transition"
        >
          <DoubleRightOutlined />
        </button>
      </div>
    </div>
  );
};

export default ShowBookContainer;
