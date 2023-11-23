// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
import type { Enum_RoleName } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string;
      name: string;
      image: string;
      role?: Enum_RoleName;
    };
  }
}
