"use client";

import { Card, Button, Table, Avatar, message } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";

const favourite = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Lorem ipsum dolor sit amet",
      price: 20.0,
      stock: "Out of Stock",
      image: "https://via.placeholder.com/50x75",
    },
    {
      id: 2,
      name: "Lorem ipsum dolor sit amet",
      price: 20.0,
      stock: "In Stock",
      image: "https://via.placeholder.com/50x75",
    },
  ]);

  const handleRemove = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const handleAddToCart = (record: any) => {
    if (record.stock === "Out of Stock") {
      message.error("สินค้าหมด ไม่สามารถเพิ่มลงตะกร้าได้");
    } else {
      message.success("เพิ่มสินค้าลงตะกร้าเรียบร้อย");
    }
  };
  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div className="flex items-center space-x-4">
          <Avatar shape="square" size={64} src={record.image} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toFixed(2)} บาท`,
    },
    {
      title: "Stock Status",
      dataIndex: "stock",
      key: "stock",
      render: (stock: string) => (
        <span
          className={
            stock === "Out of Stock" ? "text-red-500 font-semibold" : ""
          }
        >
          {stock}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => handleAddToCart(record)}
          >
            Add to Cart
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemove(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card
        title={
          <h2 className="text-xl font-semibold text-center">My Wishlist</h2>
        }
      >
        <Table
          dataSource={wishlist}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default favourite;
