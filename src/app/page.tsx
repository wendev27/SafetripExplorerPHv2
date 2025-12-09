"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layouts/MainLayout";
import { HeroSection } from "@/components/features/HeroSection";
import {
  TouristSpotCard,
  type TouristSpot,
} from "@/components/features/TouristSpotCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Import the navigation component directly since MainLayout might have auth issues
import { Navigation } from "@/components/layouts/Navigation";
import { Footer } from "@/components/layouts/Footer";

/**
 * Home Page Component
 *
 * Main landing page with hero section, featured spots, and call-to-actions
 * Responsive design with animations and modern UI patterns
 *
 * Features:
 * - Hero section with search and statistics
 * - Featured tourist spots grid
 * - Loading states and error handling
 * - Responsive layout for all screen sizes
 * - Smooth animations and transitions
 */

// Featured spots data (mock data for now - will be replaced with API call)
const featuredSpots: TouristSpot[] = [
  {
    _id: "1",
    title: "Boracay Beach",
    description:
      "World-famous white sand beach with crystal clear waters, perfect for swimming, diving, and water sports.",
    location: "Boracay, Aklan",
    category: "Beach",
    price: 2500,
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 1250,
    duration: "Full Day",
    maxCapacity: 20,
  },
  {
    _id: "2",
    title: "Palawan Underground River",
    description:
      "UNESCO World Heritage site featuring the longest navigable underground river in the world.",
    location: "Sabang, Palawan",
    category: "Adventure",
    price: 1800,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 890,
    duration: "Half Day",
    maxCapacity: 15,
  },
  {
    _id: "3",
    title: "Chocolate Hills",
    description:
      "800 perfectly cone-shaped hills that turn brown during dry season, creating a unique landscape.",
    location: "Bohol",
    category: "Nature",
    price: 1200,
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
    ],
    rating: 4.7,
    reviewCount: 756,
    duration: "Full Day",
    maxCapacity: 25,
  },
  {
    _id: "4",
    title: "Mayon Volcano",
    description:
      "Perfect cone-shaped volcano offering breathtaking views and hiking opportunities.",
    location: "Albay, Bicol",
    category: "Adventure",
    price: 1500,
    images: [
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop",
    ],
    rating: 4.6,
    reviewCount: 623,
    duration: "Full Day",
    maxCapacity: 12,
  },
  {
    _id: "5",
    title: "Rizal Park",
    description:
      "Historic park in Manila featuring beautiful gardens, monuments, and bay views.",
    location: "Manila",
    category: "Cultural",
    price: 500,
    images: [
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
    ],
    rating: 4.4,
    reviewCount: 445,
    duration: "Half Day",
    maxCapacity: 30,
  },
  {
    _id: "6",
    title: "El Nido Beaches",
    description:
      "Stunning limestone cliffs and pristine beaches with world-class island hopping tours.",
    location: "El Nido, Palawan",
    category: "Beach",
    price: 2200,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 1340,
    duration: "Full Day",
    maxCapacity: 18,
  },
];

function HomeContent() {
  // State for managing spots data and loading
  const [spots, setSpots] = useState<TouristSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Animation variants for the spots grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Fetch spots data from MongoDB Atlas
  useEffect(() => {
    const fetchSpots = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/shared/spots");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setSpots(result.data || []);
        } else {
          throw new Error(result.message || "Failed to fetch spots");
        }

        setError(null);
      } catch (err: any) {
        console.error("Error fetching spots:", err);
        setError(err.message || "Failed to load tourist spots");

        // Fallback to mock data if API fails
        console.warn("Falling back to mock data due to API error");
        setSpots(featuredSpots.slice(0, 6)); // Show first 6 mock spots
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Spots Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-responsive">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-responsive-xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Tourist Spots
            </h2>
            <p className="text-responsive-base text-muted-foreground max-w-2xl mx-auto">
              Discover the most popular and highly-rated destinations across the
              Philippines. Each spot offers unique experiences and unforgettable
              memories.
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          )}

          {/* Spots Grid */}
          {!loading && !error && spots.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
            >
              {spots.map((spot) => {
                const spotId =
                  typeof spot._id === "string"
                    ? spot._id
                    : typeof spot._id === "object" && spot._id?.$oid
                    ? spot._id.$oid
                    : String(spot._id);
                return <TouristSpotCard key={spotId} spot={spot} />;
              })}
            </motion.div>
          )}

          {/* No Spots State */}
          {!loading && !error && spots.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border">
                <div className="text-6xl mb-4">🏖️</div>
                <h3 className="text-xl font-semibold mb-2">
                  No Tourist Spots Found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Your MongoDB Atlas database is connected successfully, but
                  there are no tourist spots in your collection yet.
                </p>
                <p className="text-sm text-muted-foreground">
                  Add some tourist spots to your MongoDB Atlas "touristspots"
                  collection to see them here!
                </p>
              </div>
            </div>
          )}

          {/* View All Button */}
          {!loading && !error && spots.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Button asChild size="lg">
                <Link href="/spots">View All Tourist Spots</Link>
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="container-responsive text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-responsive-xl font-bold">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-responsive-base opacity-90">
              Join thousands of travelers who have discovered the beauty of the
              Philippines through our platform. Create your account and start
              exploring today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/auth/register">Create Free Account</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Link href="/spots">Browse Destinations</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Welcome Section with Team Members (copied from original design)
function WelcomeSection() {
  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-responsive-xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Welcome to SafeTrip Explorer PH v2
          </h1>
          <p className="text-responsive-base text-muted-foreground mb-8">
            Created by BSIT – Mobile & Web Application Students
          </p>

          {/* Team Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center gap-6 mt-8 flex-wrap"
          >
            <div className="flex flex-col items-center text-center group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <img
                  src="https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/493260344_122160615110571086_4262538103597502125_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGkCSn5dOOPDZDSHNdROeJJznMKCPC4Zb7OcwoI8LhlvjWPOOdXIRCoscpPfpQnAzRl2IfCrmUWz8_cPeq9RkIL&_nc_ohc=2EfRcjr_AWMQ7kNvwFPH1VS&_nc_oc=AdkE3sTgP_uwKGHEVGlwlJO30yQPVaft70SVMv2xSEnt-GheQFjtSU5H8voG_wWNaN1vp-jffT_tR0mzwdbV2Ozg&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=CTKi_wqEwBxwCdPQJ2VhOw&oh=00_AfmgdXJFvou-8561NTH-LgdmG5B-nUdlDknxfMJf9RtsgA&oe=69385DC2"
                  alt="Mark Wendell M. Aquino"
                  className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700 group-hover:shadow-xl transition-shadow"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-700"></div>
              </motion.div>
              <p className="text-sm mt-3 font-medium text-gray-700 dark:text-gray-300">
                Mark Wendell M. Aquino
              </p>
              <p className="text-xs text-muted-foreground">Team Lead</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <img
                  src="https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-1/589017530_1470960144203081_6251310109186282458_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFwGQYnznMk71VhigI19D0Lb2_khXmeNGFvb-SFeZ40YbAAHeBLL9p6qsjUh60j6_ciXbb_T03xBBGP2kpMqAOU&_nc_ohc=K30TvSOXp_EQ7kNvwGD3Nqt&_nc_oc=AdkjhwJvoCJaovN_AySKj4zzm1I5OsZjbIzO2jp6-yCq0uaNjQSZcO7r-Djy1tlp0aoBt82Gip0iykHBX-iYPKsZ&_nc_zt=24&_nc_ht=scontent.fmnl4-2.fna&_nc_gid=TqMYsCWL1OwczmnFacG1Rw&oh=00_Afktm6icGHhrMvE6QxwZDtAz6IAGc7BmzD5sgsCbAaIvbg&oe=6938517C"
                  alt="Moreno Jello"
                  className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700 group-hover:shadow-xl transition-shadow"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white dark:border-gray-700"></div>
              </motion.div>
              <p className="text-sm mt-3 font-medium text-gray-700 dark:text-gray-300">
                Moreno Jello
              </p>
              <p className="text-xs text-muted-foreground">UI/UX Designer</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <img
                  src="https://scontent.fmnl4-1.fna.fbcdn.net/v/t39.30808-6/529200546_763762896594007_479117549778957720_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGHnFtWAdHZ92cbjt2r_YOD1bog-dPZN-3VuiD509k37Yf4RnUd8zWCMQKKcKhv-KSdDgrHmNkCkuD5kVNq_mji&_nc_ohc=Fcxfu7RuSQ4Q7kNvwEQnuje&_nc_oc=AdmR8XJtVloIhblRJLoo6zGfaEDiRSLumRNtt28td40rtzuhVFmOlq1Lm37sgdO5VTXBb-90yFn9fA01lA6r9Ku1&_nc_zt=23&_nc_ht=scontent.fmnl4-1.fna&_nc_gid=DnSKZ4eCZ8uAthafK2pNGQ&oh=00_AfnENWTzCK1-cEzxDhRuKjnomvHvGl4p6D5jx-mDcQcdoA&oe=6938562D"
                  alt="Princess Nicole Mercado"
                  className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700 group-hover:shadow-xl transition-shadow"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500 rounded-full border-2 border-white dark:border-gray-700"></div>
              </motion.div>
              <p className="text-sm mt-3 font-medium text-gray-700 dark:text-gray-300">
                Princess Nicole Mercado
              </p>
              <p className="text-xs text-muted-foreground">Project Manager</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <img
                  src="https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-1/549258337_720715894321336_8851734021799582113_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=108&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGBRZ6O5Uqywyc3at7zSDS7V0dwDn2L4VpXR3AOfYvhWgU1j32DJKsuD6pANa0sx6dOxhwIxMrGGaCmV1xt3_Sf&_nc_ohc=iz3VY4D-LuQQ7kNvwHsPYF1&_nc_oc=AdlGTh9Y2pO9eDAQVh3vQEKPvUC7JmDU-3EclHSvYpKq5zEyfCFPKhSZG91-i_2uiEN7US5Q7xvCpg7VBBcMq-5c&_nc_zt=24&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=Zzqq1fqwrf1YdAG8jHYApw&oh=00_Afnh2p5eswpPk8fNvLUjFwOku946whWr-O4gI3Tdqh9IIg&oe=69386EE8"
                  alt="Prinze Muyo"
                  className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700 group-hover:shadow-xl transition-shadow"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full border-2 border-white dark:border-gray-700"></div>
              </motion.div>
              <p className="text-sm mt-3 font-medium text-gray-700 dark:text-gray-300">
                Prinze Muyo
              </p>
              <p className="text-xs text-muted-foreground">QA Tester</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function HomePage() {
  // Simplified layout without authentication dependencies
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <WelcomeSection />
        <HomeContent />
      </main>
      <Footer />
    </div>
  );
}
