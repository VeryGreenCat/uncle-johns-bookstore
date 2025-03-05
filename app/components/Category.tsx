const Category = () => {
  const categories: string[] = [
    "Fiction",
    "Mystery",
    "Sci-Fi",
    "Romance",
    "History",
    "Biography",
  ];
  return (
    <div className="flex space-x-4 overflow-x-auto p-4">
      {categories.map((category) => (
        <div key={category} className="bg-[#743014] px-4 py-2 rounded-lg font-bold text-white">
          {category}
        </div>
      ))}
    </div>
  );
};
export default Category;
