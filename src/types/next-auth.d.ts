declare module "next-auth" {
  type User = {
    email: string;
  };
  interface Session {
    user: User;
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    emailVerified: string;
    iat: number;
    exp: number;
    jti: string;
    expires: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    emailVerified: string;
    iat: number;
    exp: number;
    jti: string;
    expires: string;
  }
}
