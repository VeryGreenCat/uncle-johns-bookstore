import Image from "next/image";

interface BookProps {
  image: string;
  title: string;
  type: string;
  price: number;
  oldPrice?: number; // Optional for discounts
  discount?: number; // Optional percentage
}

const Book = ({ image, title, type, price, oldPrice, discount }: BookProps) => {
  return (
    <div className="border rounded-xl p-3 shadow-md">
      {/* Book Cover */}
      <div className="relative w-full h-64 flex justify-center items-center">
        <Image
          src={image}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-auto rounded-lg object-contain"
        />
      </div>

      {/* Book Details */}
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="text-gray-500 text-sm">{type}</p>

      {/* Price Section */}
      <div className="mt-2 flex items-center space-x-2">
        {discount && oldPrice ? (
          <>
            <span className="text-red-500 font-bold">-{discount}%</span>
            <span className="text-red-500 font-bold">฿ {price}</span>
            <span className="text-gray-400 line-through">฿ {oldPrice}</span>
          </>
        ) : (
          <span className="text-red-500 font-bold">฿ {price}</span>
        )}
      </div>
    </div>
  );
};

export default Book;
