import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import bcrypt from "bcryptjs";
import prisma from "./lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

// Twój CustomUser
type CustomUser = {
  description: string;
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  ads: boolean;
  notifications: boolean;
  roles: string[];
};

// Rozszerzenie DefaultSession
declare module "next-auth" {
  interface Session {
    user: CustomUser;
    ads: boolean;
    notifications: boolean;
    roles: string[];
    description: string;
    
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);
          const user = await prisma.user.findFirst({ where: { email } });
    
          if (!user) {
            return null;
          }
    
          const isValid = await bcrypt.compare(password, user.password!);
          if (!isValid) {
            return null;          
          }
    
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            ads: user.ads,
            notifications: user.notifications,
            roles: user.roles,
          } as CustomUser;
        } catch (error:any) {
          throw new Error(error.message || "Login failed.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.ads = token.ads as boolean; 
      session.notifications = token.notifications as boolean;
      session.roles = token.roles as string[];
      session.description = token.description as string;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser; // Rzutowanie do CustomUser
        token.id = customUser.id;
        token.roles = customUser.roles;
        token.ads = customUser.ads; // Ustawienie ads na token
        token.notifications = customUser.notifications; // Ustawienie notifications na token
        token.roles = customUser.roles; // Ustawienie roles na token
        token.description = customUser.description;
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
