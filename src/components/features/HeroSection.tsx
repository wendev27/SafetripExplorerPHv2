"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Users, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Hero Section Component
 *
 * Modern hero section with animations, search functionality, and statistics
 * Responsive design with mobile-first approach
 *
 * Features:
 * - Animated text and elements
 * - Search functionality
 * - Statistics display
 * - Call-to-action buttons
 * - Background gradients and effects
 */

// Statistics data
const stats = [
  { icon: MapPin, label: "Tourist Spots", value: "500+" },
  { icon: Users, label: "Happy Travelers", value: "10K+" },
  { icon: Star, label: "Average Rating", value: "4.8" },
  { icon: Camera, label: "Photos Shared", value: "25K+" },
];

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Background images for carousel effect
  const backgroundImages = [
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop",
  ];

  // Auto-change background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to spots page with search query
      window.location.href = `/spots?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images Carousel */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentImageIndex ? 1 : 0,
            }}
            transition={{ duration: 1 }}
          />
        ))}
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 gradient-primary opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-responsive text-center text-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-responsive-xl font-bold leading-tight">
              Discover the Beauty of
              <span className="block gradient-primary bg-clip-text text-transparent">
                Philippines
              </span>
            </h1>
            <motion.p
              variants={itemVariants}
              className="text-responsive-base text-gray-200 max-w-2xl mx-auto"
            >
              Explore breathtaking tourist spots, connect with local experiences,
              and create unforgettable memories across the Philippine archipelago.
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSearch}
            className="max-w-md mx-auto flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/90 backdrop-blur-sm border-0 text-black placeholder:text-gray-500"
              />
            </div>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-6"
            >
              Search
            </Button>
          </motion.form>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
              <Link href="/spots">
                Explore Spots
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              <Link href="/auth/register">
                Join Community
              </Link>
            </Button>
          </motion.div>

          {/* Statistics */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                animate={floatingAnimation}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
