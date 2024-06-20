import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import bcrypt from "bcryptjs"
import prisma from "./lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try{
          let user = null
          const { email, password } = await signInSchema.parseAsync(credentials)
          const pwHash = await bcrypt.hash(password, 10);
          console.log(pwHash);
          user = await prisma.user.findFirst({ where: { email } })
          if (!user) {
            throw new Error("User not found.");
          }
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
})