"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

/**
 * Authentication Provider Component
 *
 * Provides NextAuth session context throughout the application
 * Manages user authentication state and session data
 *
 * Features:
 * - Global session management
 * - Automatic session refresh
 * - SSR compatibility
 * - TypeScript support for session data
 */
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider
      // Re-fetch session every 5 minutes in the background
      refetchInterval={5 * 60}
      // Re-fetch when window gains focus
      refetchOnWindowFocus={true}
      // Re-fetch when user navigates between pages
      refetchWhenOffline={false}
    >
      {children}
    </SessionProvider>
  );
}
