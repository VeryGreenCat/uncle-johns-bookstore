"use client";
import { useRef, useEffect, useState } from "react";
import Book from "./Book";
import { BookProps } from "@/utils/props";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

const ShowBookContainer = ({
  books,
  headerText,
}: {
  books: BookProps[];
  headerText: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const visibleBooks = 5; // จำนวนเล่มที่แสดงต่อหน้า

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
        // เลื่อนไปเริ่มต้นใหม่แบบไร้รอยต่อ
        containerRef.current.scrollTo({ left: 0, behavior: "instant" });
      }
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      if (containerRef.current.scrollLeft <= 0) {
        // เลื่อนไปจุดสุดท้ายแบบไร้รอยต่อ
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

    setTimeout(() => setIsTransitioning(false), 500); // ป้องกันการกดซ้ำระหว่าง transition
  };

  return (
    <div className="relative p-4 bg-[#ECE1CC] rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{headerText}</h2>
      </div>

      {/* Book Slider */}
      <div className="relative flex items-center mt-4">
        {/* Left Button */}
        <button
          onClick={() => handleScroll("prev")}
          className="absolute left-0 z-10 bg-[#743014] w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-[#472111] text-white transition"
        >
          <DoubleLeftOutlined />
        </button>

        {/* Scrollable Book Container */}
        <div className="w-full overflow-hidden">
          <div
            ref={containerRef}
            className="flex gap-4 flex-nowrap overflow-x-scroll scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for Firefox & Edge
          >
            {books.map((book) => (
              <div key={book.id} className="flex-none w-1/5 min-w-[20%]">
                <Book {...book} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
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
