import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layouts/ThemeProvider";
import { AuthProvider } from "@/components/layouts/AuthProvider";

// Load fonts with proper subsets for better performance
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SafeTrip Explorer PH v2 - Discover Philippines",
  description: "Your ultimate guide to exploring tourist spots in the Philippines with modern responsive design",
  keywords: ["Philippines", "tourism", "travel", "spots", "explorer"],
  authors: [{ name: "Mark Wendell Aquino & Team" }],
};

// Separate viewport export as required by Next.js 15
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        {/* Theme provider for dark/light mode */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Authentication provider wrapper */}
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
