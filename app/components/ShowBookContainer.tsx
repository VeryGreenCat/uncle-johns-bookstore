"use client";
import { useRef } from "react";
import Book from "./Book";
import { BookProps } from "@/utils/props";

const ShowBookContainer = ({
  books,
  headerText,
}: {
  books: BookProps[];
  headerText: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth; // Scroll 5 books
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth; // Scroll 5 books
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative p-4 bg-gray-100 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{headerText}</h2>
      </div>

      {/* Book Slider */}
      <div className="relative flex items-center mt-4">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 bg-gray-300 w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-gray-400 transition"
        >
          &#9665;
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
          onClick={handleNext}
          className="absolute right-0 z-10 bg-gray-300 w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-gray-400 transition"
        >
          &#9655;
        </button>
      </div>
    </div>
  );
};

export default ShowBookContainer;
