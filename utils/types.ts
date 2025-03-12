export interface User {
  userId: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  birthday: Date;
  gender: string;
  phoneNumber: string;
}

export interface Book {
  name: string;
  bookId: string;
  author: string;
  price: number;
  discount: number;
  quantity: number;
  publisher: string;
  rating: number | null;
  bookDetails: string;
  imageURL: string;
  category: {
    name: string;
    categoryId: string;
  };
}
