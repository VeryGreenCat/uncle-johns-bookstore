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
  BookId: string; // prisma edit from id : number to BookId : string
  image: string;
  title: string;
  type: string;
  price: number;
  oldPrice?: number;
  discount?: number;
}
// prisma edit category
export interface category {
  idCat: string;
  name: string;
}
