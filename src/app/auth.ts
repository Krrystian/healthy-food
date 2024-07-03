import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import bcrypt from "bcryptjs"
import prisma from "./lib/prisma"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try{
          let user = null
          const { email, password } = await signInSchema.parseAsync(credentials)
          user = await prisma.user.findFirst({ where: { email } })
          if (!user) {
            throw new Error("User not found.");
          }
          const isValid = await bcrypt.compare(password, user.password!)
          if (!isValid) {
            throw new Error("Invalid password.");
          }
          console.log("User found and password is valid.", user)
          return user
        }
        catch (error) {
          console.log(error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user = user || token?.user || session?.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
})
