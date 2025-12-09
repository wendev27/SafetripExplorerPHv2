"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Star } from "lucide-react";
import { TouristSpotCard, type TouristSpot } from "@/components/features/TouristSpotCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MainLayout } from "@/components/layouts/MainLayout";

/**
 * Spots Listing Page
 *
 * Browse all available tourist spots with search and filtering
 * Modern design with responsive grid and smooth animations
 */

export default function SpotsPage() {
  const [spots, setSpots] = useState<TouristSpot[]>([]);
  const [filteredSpots, setFilteredSpots] = useState<TouristSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const router = useRouter();

  // Categories for filtering
  const categories = [
    "All",
    "Beach",
    "Adventure",
    "Nature",
    "Cultural",
    "Historical",
    "Island",
    "Mountain",
    "City",
    "Resort",
    "Park"
  ];

  // Fetch all spots
  useEffect(() => {
    const fetchSpots = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/shared/spots");
        if (!response.ok) throw new Error("Failed to fetch spots");

        const data = await response.json();
        if (data.success) {
          setSpots(data.data || []);
          setFilteredSpots(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching spots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  // Filter spots based on search and category
  useEffect(() => {
    let filtered = spots;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(spot =>
        spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(spot => spot.category === selectedCategory);
    }

    setFilteredSpots(filtered);
  }, [spots, searchQuery, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled in real-time via useEffect
  };

  return (
    <MainLayout>
      <div className="container-responsive py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Amazing Spots
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the most beautiful tourist destinations in the Philippines.
            Find your perfect adventure and create unforgettable memories.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search destinations, locations, or activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </form>

            {/* Results Count */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{filteredSpots.length} spots found</span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category === "All" ? "" : category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading amazing destinations...</p>
          </motion.div>
        )}

        {/* Error State */}
        {!loading && spots.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🏖️</div>
            <h2 className="text-2xl font-bold mb-4">No spots available</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We're working on adding amazing tourist spots to our platform.
              Check back soon for incredible destinations!
            </p>
            <Button onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </motion.div>
        )}

        {/* No Results */}
        {!loading && spots.length > 0 && filteredSpots.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">No spots found</h2>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or filters
            </p>
            <Button onClick={() => {
              setSearchQuery("");
              setSelectedCategory("");
            }}>
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Spots Grid */}
        {!loading && filteredSpots.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredSpots.map((spot, index) => (
              <motion.div
                key={typeof spot._id === 'string' ? spot._id : spot._id?.$oid || String(spot._id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TouristSpotCard spot={spot} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
