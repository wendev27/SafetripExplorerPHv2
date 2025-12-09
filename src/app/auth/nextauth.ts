import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { User } from "@/lib/models/User";

/**
 * NextAuth Configuration
 *
 * Authentication setup using NextAuth.js with MongoDB adapter
 * Supports credentials-based authentication with role-based access
 *
 * Features:
 * - MongoDB database adapter
 * - Credentials provider for email/password login
 * - Role-based authentication (user, admin, superadmin)
 * - Session management with JWT
 * - Secure password hashing with bcrypt
 */

// Extend NextAuth types to include role
declare module "next-auth" {
  interface User {
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  // MongoDB adapter for session and user management
  adapter: MongoDBAdapter(clientPromise),

  // Authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // Validate input
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          // Connect to database
          const client = await clientPromise;
          const db = client.db();

          // Find user by email
          const user = await db.collection("users").findOne({
            email: credentials.email.toLowerCase(),
          });

          // Check if user exists
          if (!user) {
            throw new Error("No user found with this email");
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          // Return user object (without password)
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.userRole || user.role || "user", // Support both userRole and role fields
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],

  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // JWT configuration
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Callbacks for customizing session and JWT
  callbacks: {
    async jwt({ token, user }) {
      // Add role to JWT token when user signs in
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      // Add role to session from JWT token
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  // Custom pages
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
  },

  // Security settings
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here",
};

export default authOptions;
