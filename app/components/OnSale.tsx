const OnSale = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold">On Sale</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {[1, 2, 3, 4].map((book) => (
          <div key={book} className="bg-white p-4 rounded-lg shadow-md">
            Book {book} - $9.99
          </div>
        ))}
      </div>
    </div>
  );
};
export default OnSale;
