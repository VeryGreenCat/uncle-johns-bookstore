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
  id: number;
  image: string;
  title: string;
  type: string;
  price: number;
  oldPrice?: number;
  discount?: number;
}
