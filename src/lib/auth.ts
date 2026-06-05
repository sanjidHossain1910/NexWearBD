import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { loginSchema } from "@/validators/auth";

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      const parsed = loginSchema.safeParse(credentials);
      if (!parsed.success) return null;
      await connectToDatabase();
      const user = await User.findOne({ email: parsed.data.email }).select("+password");
      if (!user?.password) return null;
      const passwordOk = await bcrypt.compare(parsed.data.password, user.password);
      if (!passwordOk) return null;
      return { id: user._id.toString(), name: user.name, email: user.email, role: user.role, image: user.image };
    }
  })
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  );
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return true;
      if (!user.email) return false;
      await connectToDatabase();
      const dbUser = await User.findOneAndUpdate(
        { email: user.email },
        {
          name: user.name ?? user.email.split("@")[0],
          email: user.email,
          image: user.image,
          role: "user"
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      user.id = dbUser._id.toString();
      (user as typeof user & { role?: string }).role = dbUser.role;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      if (token.email && (!token.id || !token.role)) {
        await connectToDatabase();
        const dbUser = await User.findOne({ email: token.email }).select("_id role").lean<{ _id: { toString: () => string }; role?: string } | null>();
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? token.sub ?? "";
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: { signIn: "/login" }
};
