"use client";
import { useRouter } from "next/navigation";
import Book from "./Book";
import { BookProps } from "@/utils/props";

const ShowBookContainer = ({
  books,
  headerText,
}: {
  books: BookProps[];
  headerText: string;
}) => {
  const router = useRouter();

  const handleShowAll = () => {
    localStorage.setItem("books", JSON.stringify(books)); // เก็บข้อมูลหนังสือ
    localStorage.setItem("searchLabel", headerText); // เก็บหัวข้อ
    router.push("/searchResult"); // เปลี่ยนหน้าไปที่ searchResult
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{headerText}</h2>
        <button
          onClick={handleShowAll}
          className="text-blue-500 cursor-pointer"
        >
          Show All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {books.map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
};

export default ShowBookContainer;
