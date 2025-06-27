import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./lib/prisma"
import { User } from "./lib/generated/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        // Basic (non-hashed) password check — use bcrypt in prod
        if (!user || user.password !== credentials.password) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
        }
      },
    }),
  ],

  callbacks: {
    // ✅ Manually create user in DB on first-time Google login
    async signIn({ user, account }) {
      if (account?.provider === "google") { 
        console.log("Google Sign In")
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        })
        console.log("Existing User:", existingUser)
        console.log("UserDetails:", user)
        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email!,
              provider: account.provider,
            },
          })
          console.log("New User:", newUser)
        }
      }

      return true
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.AUTH_SECRET,
})

function generateUsername(name: string) {
  return (
    name.toLowerCase().replace(/\s+/g, "-") +
    "-" +
    Math.floor(Math.random() * 10000)
  )
}
