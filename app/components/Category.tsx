const Category = () => {
  const categories: string[] = [
    "จิตวิทยา",
    "การ์ตูน",
    "นิยาย",
    "การเงินการลงทุน",
    "ประวัติศาสตร์",
    "ชีวประวัติ",
    "คู่มือเรียน-สอบ",
  ];
  return (
    <div className="flex space-x-4 overflow-x-auto p-4">
      {categories.map((category) => (
        <div key={category} className="bg-gray-200 px-4 py-2 rounded-lg">
          {category}
        </div>
      ))}
    </div>
  );
};
export default Category;
