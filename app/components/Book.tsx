import Image from "next/image";
import { Book } from "@/utils/types";
import { FileImageOutlined } from "@ant-design/icons";

const BookCard = ({ name, price, discount, imageURL, category }: Book) => {
  const discountPrice = Math.ceil(price - (price * discount) / 100);

  return (
    <div className="border rounded-xl p-3 shadow-md h-[450px] flex flex-col justify-between bg-white">
      {/* Book Cover */}
      <div className="relative w-full h-[250px] flex justify-center items-center">
        {imageURL ? (
          <Image
            src={imageURL}
            alt={name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-auto rounded-lg object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
            <FileImageOutlined className="text-gray-500 text-6xl" />
          </div>
        )}
      </div>

      {/* Book Details */}
      <div>
        <h3 className="mt-3 font-semibold min-h-[40px]">{name}</h3>
        <p className="text-gray-500 text-sm">{category.name}</p>
      </div>

      {/* Price Section */}
      <div className="mt-2 flex items-center space-x-2">
        {discount && discountPrice ? (
          <>
            <span className="text-red-500 font-bold">-{discount}%</span>
            <span className="text-red-500 font-bold">฿ {discountPrice}</span>
            <span className="text-gray-400 line-through">฿ {price}</span>
          </>
        ) : (
          <span className="text-red-500 font-bold">฿ {price}</span>
        )}
      </div>
    </div>
  );
};

export default BookCard;
