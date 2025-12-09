"use client";

import { useState } from "react";
import Link from "next/link";
// import { useSession, signOut } from "next-auth/react"; // Temporarily disabled
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut,
  MapPin,
  Home,
  Settings,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Navigation Component
 *
 * Responsive navigation bar with mobile hamburger menu
 * Supports role-based navigation and theme switching
 *
 * Features:
 * - Mobile-first responsive design
 * - Role-based menu items (user, admin, superadmin)
 * - Dark/light theme toggle
 * - Smooth animations with Framer Motion
 * - Authentication-aware navigation
 */

// Navigation items configuration
const navigationItems = {
  public: [
    { name: "Home", href: "/", icon: Home },
    { name: "Spots", href: "/spots", icon: MapPin },
  ],
  user: [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "My Profile", href: "/profile", icon: User },
  ],
  admin: [
    { name: "Admin Dashboard", href: "/admin/dashboard", icon: BarChart3 },
    { name: "Manage Spots", href: "/admin/spots", icon: MapPin },
  ],
  superadmin: [
    { name: "Super Admin", href: "/superadmin/dashboard", icon: Settings },
    { name: "All Users", href: "/superadmin/users", icon: User },
  ],
};

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Temporary: simulate logged out state
  const session = null;
  const status = "unauthenticated";
  const { theme, setTheme } = useTheme();

  // Determine user role for navigation
  const userRole = session?.user?.role || "public";
  const currentNavItems =
    navigationItems[userRole as keyof typeof navigationItems] ||
    navigationItems.public;

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Handle sign out
  const handleSignOut = () => {
    // signOut({ callbackUrl: "/" }); // Temporarily disabled
    console.log("Sign out clicked - authentication disabled");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-responsive">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-responsive-lg gradient-primary bg-clip-text text-transparent"
          >
            <MapPin className="h-6 w-6 text-primary" />
            <span>SafeTrip PH</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Navigation Links */}
            {currentNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* User-specific navigation */}
            {session?.user && (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </>
            )}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Authentication Buttons */}
            {status === "loading" ? (
              <div className="h-9 w-9 animate-pulse bg-muted rounded-md" />
            ) : session ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {session.user?.name || session.user?.email}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSignOut}
                  className="h-9 w-9"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Sign out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background"
          >
            <div className="container-responsive py-4 space-y-4">
              {/* Mobile Navigation Links */}
              {currentNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* Mobile Theme Toggle */}
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className="w-full justify-start"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
                    Dark Mode
                  </>
                )}
              </Button>

              {/* Mobile Authentication */}
              {session ? (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground px-2 py-1">
                    {session.user?.name || session.user?.email}
                  </div>
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    asChild
                    className="w-full justify-start"
                  >
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link
                      href="/auth/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
