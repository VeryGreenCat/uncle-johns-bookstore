import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      surname: string;
      email: string;
      birthday: Date;
      gender: string;
      phoneNumber: string;
      image: string;
    };
  }
}
