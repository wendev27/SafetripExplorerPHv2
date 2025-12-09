"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, Heart, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";

/**
 * Tourist Spot Card Component
 *
 * Displays individual tourist spot information in a card format
 * Responsive design with hover animations and mobile optimization
 *
 * Features:
 * - Image with fallback
 * - Rating display
 * - Price information
 * - Location details
 * - Hover effects and animations
 * - Mobile-first responsive design
 */

// Tourist spot data interface
export interface TouristSpot {
  _id: string | { $oid: string }; // Handle MongoDB ObjectId format
  title: string;
  description: string;
  location: string;
  category: string;
  price: number;
  images: string[];
  rating?: number;
  reviewCount?: number;
  amenities?: string[];
  duration?: string;
  maxCapacity?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Props for TouristSpotCard component
 */
interface TouristSpotCardProps {
  spot: TouristSpot;
  onFavorite?: (spotId: string) => void;
  isFavorited?: boolean;
  className?: string;
  variants?: any; // For staggered animations
}

/**
 * TouristSpotCard Component
 *
 * Displays tourist spot information with animations and responsive design
 */
export function TouristSpotCard({
  spot,
  onFavorite,
  isFavorited = false,
  className,
  variants
}: TouristSpotCardProps) {
  // Early return if spot is invalid
  if (!spot || !spot.title) {
    return null;
  }

  // Helper function to get string ID from MongoDB ObjectId
  const getSpotId = () => {
    if (typeof spot._id === 'string') {
      return spot._id;
    }
    if (typeof spot._id === 'object' && spot._id?.$oid) {
      return spot._id.$oid;
    }
    return String(spot._id || 'unknown');
  };
  // Card animation variants for staggered animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: { duration: 0.2 }
    }
  };

  // Handle favorite toggle
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavorite?.(getSpotId());
  };

  return (
    <motion.div
      variants={variants || cardVariants}
      whileHover="hover"
      className={cn("h-full", className)}
    >
      <Card className="h-full overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        {/* Image Section */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={spot.images?.[0] || "/placeholder-spot.jpg"}
            alt={spot.title || "Tourist spot"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-spot.jpg";
            }}
          />

          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite Button */}
          {onFavorite && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  isFavorited ? "fill-red-500 text-red-500" : "text-white"
                )}
              />
            </motion.button>
          )}

          {/* Category Badge */}
          <Badge
            className="absolute top-4 left-4 bg-primary/90 text-white hover:bg-primary"
          >
            {spot.category}
          </Badge>

          {/* Rating */}
          {spot.rating && spot.rating > 0 && (
            <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-white text-sm font-medium">
                {Number(spot.rating).toFixed(1)}
              </span>
              {spot.reviewCount && spot.reviewCount > 0 && (
                <span className="text-white/70 text-xs">
                  ({spot.reviewCount})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        <CardContent className="p-4 sm:p-6 flex flex-col h-full">
          {/* Title and Location */}
          <div className="mb-3">
            <Link href={`/spots/${getSpotId()}`}>
              <h3 className="text-responsive-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-1 hover:text-primary transition-colors">
                {spot.title}
              </h3>
            </Link>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{spot.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {spot.description}
          </p>

          {/* Additional Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            {spot.duration && (
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{spot.duration}</span>
              </div>
            )}
            {spot.maxCapacity && (
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                <span>Max {spot.maxCapacity}</span>
              </div>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex-1">
              <div className="text-lg font-bold text-primary">
                {formatCurrency(Number(spot.price) || 0)}
              </div>
              <div className="text-xs text-muted-foreground">per person</div>
            </div>
            <Button asChild size="sm" className="shrink-0">
              <Link href={`/spots/${getSpotId()}`}>
                View Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
