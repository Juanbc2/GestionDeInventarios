import prisma from "@/service/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, user }) {
      const usr = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
        include: {
          role: true,
        },
      });

      return { ...session, user: { ...session.user, role: usr?.role?.name } };
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID || "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
};

export default NextAuth(authOptions);
