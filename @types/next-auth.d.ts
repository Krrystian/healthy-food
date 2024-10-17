import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
      ads: boolean;
      notifications: boolean;
      roles: string[];
      description: string;
    };
    ads: boolean;
    notifications: boolean;
    roles: string[];
    description: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    ads: boolean;
    notifications: boolean;
    roles: string[];
    description: string;
  }
}
