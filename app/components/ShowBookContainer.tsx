import Book from "./Book"; // Import the Book component
import { BookProps } from "@/utils/props";

const ShowBookContainer = ({
  books,
  headerText,
}: {
  books: BookProps[];
  headerText: string;
}) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold">{headerText}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {books.map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
};
export default ShowBookContainer;
