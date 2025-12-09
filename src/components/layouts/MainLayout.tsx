"use client";

import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { motion } from "framer-motion";

/**
 * Main Layout Component
 *
 * Provides the overall page structure with navigation and footer
 * Includes smooth page transitions and responsive design
 *
 * Features:
 * - Responsive navigation bar
 * - Footer component
 * - Page transition animations
 * - Container responsiveness
 */
interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <motion.main
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
