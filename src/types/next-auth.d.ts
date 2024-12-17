import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    profileComplete: boolean;
    role: Role;
  }

  interface Session {
    user: {
      profileComplete: boolean;
      role: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
    profileComplete: boolean;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    profileComplete: boolean;
    role: Role;
  }
}
