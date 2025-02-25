import Book from "./Book"; // Import the Book component

const books = [
  {
    id: 1,
    image: "/media/images/book1.jpg",
    title: "มุมมองนักอ่านพระเจ้า เล่ม 1 (PDF)",
    type: "E-Book",
    price: 0,
  },
  {
    id: 2,
    image: "/media/images/book1.jpg",
    title: "หนังสือเรียนรายวิชาพื้นฐาน คณิตศาสตร์ ม.3 เล่ม 2 (PDF)",
    type: "E-Book",
    price: 53,
    oldPrice: 59,
    discount: 10,
  },
  {
    id: 3,
    image: "/media/images/book1.jpg",
    title: "สำเร็จนอกกรอบ",
    type: "หนังสือเล่ม",
    price: 237.5,
    oldPrice: 250,
    discount: 5,
  },
  {
    id: 4,
    image: "/media/images/book1.jpg",
    title: "เรื่องของสูตรคำนวณใน Excel (PDF)",
    type: "E-Book",
    price: 0,
  },
];

const NewBook = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold">New Releases</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {books.map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
};
export default NewBook;
