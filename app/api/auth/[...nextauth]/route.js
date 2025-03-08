import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/utils/db";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";

// authOptions includes providers, adapter, callbacks and session
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Find user in database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          birthday: user.birthday,
          gender: user.gender,
          phoneNumber: user.phoneNumber,
          address: user.address,
        }; // This object gets stored in the JWT
      },
    }),
  ],

  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 60 * 5, // 5 minutes timeout
  },
  jwt: {
    encryption: true, // Enable JWT encryption
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.surname = user.surname;
        token.email = user.email;
        token.birthday = user.birthday;
        token.gender = user.gender;
        token.phoneNumber = user.phoneNumber;
        token.address = user.address;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.surname = token.surname;
        session.user.email = token.email;
        session.user.birthday = token.birthday;
        session.user.gender = token.gender;
        session.user.phoneNumber = token.phoneNumber;
        session.user.address = token.address;
      }
      return session;
    },
  },
});
export { handler as GET, handler as POST };
