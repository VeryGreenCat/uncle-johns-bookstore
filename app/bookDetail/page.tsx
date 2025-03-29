"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, Button, Rate, Select, message, Spin } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { Book } from "@/utils/types";
import { getUserId } from "@/utils/shareFunc";
import Image from "next/image";

const BookDetail = () => {
  const searchParams = useSearchParams();
  const [book, setBook] = useState<Book | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const bookId = searchParams.get("bookId");

  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    if (bookId) {
      fetchBookDetails(bookId);
      checkFavouriteStatus();
    }
  }, [bookId]);

  const fetchBookDetails = async (bookId: string) => {
    try {
      const res = await fetch(`/api/book/getEachBook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      const data = await res.json();
      if (res.ok) {
        setBook(data.book);
      } else {
        message.error("ไม่สามารถโหลดข้อมูลหนังสือได้");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดขณะโหลดข้อมูลหนังสือ");
    }
  };

  const checkFavouriteStatus = async () => {
    if (!userEmail) {
      message.error("User email is not available");
      return;
    }
    const userId = await getUserId(userEmail);

    try {
      const res = await fetch("/api/favourite/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          bookId: bookId,
        }),
      });

      if (!res.ok) {
        throw new Error(
          `Check Favourite Error: ${res.status} - ${res.statusText}`
        );
      }

      const data = await res.json();

      if (data) {
        setIsFavourite(data.isFavourite);
        // console.log("Favourite status:", data.isFavourite);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(
        "API Error: " + ((error as any)?.message || "Unknown error")
      );
    }
  };

  const addFavourite = async () => {
    if (!userEmail) {
      message.error("User email is not available");
      return;
    }
    const userId = await getUserId(userEmail);

    try {
      const res = await fetch("/api/favourite/addFavourite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          bookId: bookId,
        }),
      });

      if (res.ok) {
        setIsFavourite(true);
        message.success("เพิ่มสินค้าเป็นสินค้าโปรดเรียบร้อย");
      } else {
        message.error(res.statusText);
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการเพิ่มสินค้าเป็นสินค้าโปรด");
    }
  };

  const removeFavourite = async () => {
    if (!userEmail) {
      message.error("User email is not available");
      return;
    }
    const userId = await getUserId(userEmail);

    try {
      const res = await fetch("/api/favourite/removeFavourite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          bookId: bookId,
        }),
      });

      if (res.ok) {
        setIsFavourite(false);
        message.success("ลบสินค้าจากรายการโปรดเรียบร้อย");
      } else {
        message.error(res.statusText);
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการลบสินค้าจากรายการโปรด");
    }
  };

  // เพิ่มลงตะกร้า
  const addToCart = async () => {
    if (!userEmail) {
      message.error("User email is not available");
      return;
    }
    const userId = await getUserId(userEmail);

    try {
      // Step 1: Get orderId using the userId
      const orderIdRes = await fetch("/api/cart/getOrderId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!orderIdRes.ok) {
        throw new Error("Failed to get orderId");
      }

      const orderIdData = await orderIdRes.json();
      const orderId = orderIdData.orderId;

      if (!orderId) {
        throw new Error("Order creation failed");
      }
      const discountedPrice = book
  ? Math.ceil(book.price - (book.price * book.discount) / 100)
  : 0;

      const addOrderDetailRes = await fetch("/api/cart/addOrderDetail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          orderId,
          bookId: bookId,
          quantity: quantity,
          price: discountedPrice,
        }),
      });

      const addOrderDetailData = await addOrderDetailRes.json();

      if (addOrderDetailRes.ok) {
        message.success("เพิ่มลงตะกร้าเรียบร้อยแล้ว");
      } else {
        message.error(
          addOrderDetailData.error || "เกิดข้อผิดพลาดในการเพิ่มลงตะกร้า"
        );
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      message.error("เกิดข้อผิดพลาดในการเพิ่มลงตะกร้า");
    }
  };

  if (!book) {
    return (
      <Spin spinning={!book} tip="กำลังโหลดข้อมูล...">
        <div className="max-w-5xl mx-auto p-6">
          <Card className="p-4 shadow-md">{/* Existing content */}</Card>
        </div>
      </Spin>
    );
  }

  const discountedPrice = Math.ceil(
    book.price - (book.price * book.discount) / 100
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="p-4 shadow-md">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4 flex justify-center">
            <Image
              src={book.imageURL || "/placeholder.png"}
              alt={book.name}
              width={200}
              height={300}
              className="rounded-lg shadow"
            />
          </div>

          <div className="col-span-8 space-y-3 flex flex-col ">
            <div>
              <h2 className="text-2xl font-semibold">{book.name}</h2>
              <p className="text-gray-600">ชื่อผู้เขียน: {book.author}</p>
              <p className="text-gray-600">สำนักพิมพ์: {book.publisher}</p>
              <p className="text-gray-600">หมวดหมู่: {book.category.name}</p>
            </div>

            <div>
              <Rate
                allowHalf
                disabled
                defaultValue={book.rating ?? undefined}
              />
              {/* Price Section */}
              <div className="mt-2 flex items-center space-x-2">
                {book.discount && discountedPrice ? (
                  <>
                    <span className="text-red-500 font-bold">
                      -{book.discount}%
                    </span>
                    <span className="text-red-500 font-bold">
                      ฿ {discountedPrice}
                    </span>
                    <span className="text-gray-400 line-through">
                      ฿ {book.price}
                    </span>
                  </>
                ) : (
                  <span className="text-red-500 font-bold">฿ {book.price}</span>
                )}
              </div>

              <div className="flex items-center gap-3 mt-4">
                <span>จำนวน</span>
                <Select
                  value={quantity}
                  onChange={setQuantity}
                  className="w-20"
                >
                  {[...Array(book.quantity).keys()].map((num) => (
                    <Select.Option key={num + 1} value={num + 1}>
                      {num + 1}
                    </Select.Option>
                  ))}
                </Select>

                {isFavourite ? (
                  <Button
                    type="text"
                    icon={
                      <HeartFilled
                        style={{ color: "red" }}
                        className=" text-xl"
                      />
                    }
                    onClick={removeFavourite}
                  />
                ) : (
                  <Button
                    type="text"
                    icon={<HeartOutlined className="text-gray-500 text-xl" />}
                    onClick={addFavourite}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">รายละเอียด:</h3>
          <p className="text-gray-700 mt-2">{book.bookDetails}</p>
        </div>

        <Button type="primary" className="mt-6 w-full" onClick={addToCart}>
          เพิ่มลงตะกร้า
        </Button>
      </Card>
    </div>
  );
};

export default BookDetail;
