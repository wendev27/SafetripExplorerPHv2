import NextAuth from "next-auth";
import { authOptions } from "@/app/auth/nextauth";

/**
 * NextAuth API Route Handler
 *
 * Handles all NextAuth.js authentication routes
 * Provides login, logout, session management, and callbacks
 *
 * Routes handled:
 * - POST /api/auth/signin/:provider - Sign in with provider
 * - POST /api/auth/signout - Sign out
 * - GET/POST /api/auth/session - Get session data
 * - GET /api/auth/csrf - Get CSRF token
 * - GET /api/auth/providers - Get available providers
 * - POST /api/auth/callback/:provider - OAuth callback
 */

const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };
