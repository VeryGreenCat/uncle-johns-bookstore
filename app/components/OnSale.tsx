import ShowBookContainer from "./ShowBookContainer";

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

const OnSale = () => {
  return (
    <>
      <ShowBookContainer books={books} headerText={"On sale"} />
    </>
  );
};

export default OnSale;
