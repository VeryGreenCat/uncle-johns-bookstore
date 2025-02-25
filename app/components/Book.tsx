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
      <div className="relative w-full h-64">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
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
