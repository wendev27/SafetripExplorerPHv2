"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * Theme Provider Component
 *
 * Wraps the application with next-themes ThemeProvider
 * Enables dark/light mode switching with system preference detection
 *
 * Features:
 * - Automatic system theme detection
 * - Smooth theme transitions
 * - Local storage persistence
 * - SSR-safe implementation
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      // Storage key for theme preference
      storageKey="safetrip-theme"
      // Default theme when no preference is set
      defaultTheme="light"
      // Enable system theme detection
      enableSystem
      // Disable transition animations on theme change for better UX
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
