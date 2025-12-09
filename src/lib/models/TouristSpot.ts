import { ObjectId } from "mongodb";

/**
 * TouristSpot Model Interface
 *
 * Defines the structure of tourist spot documents in MongoDB Atlas
 * Used for type safety and data validation
 */

export interface TouristSpot {
  _id: ObjectId | string;
  title: string;
  description: string;
  location: string;
  category: string;
  price: number;
  images: string[];
  amenities?: string[];
  rating?: number;
  reviewCount?: number;
  duration?: string;
  maxCapacity?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  tags?: string[];
  featured?: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: ObjectId | string; // Admin/SuperAdmin who created it
}

/**
 * TouristSpot Creation Data Interface
 * Used for creating new tourist spots
 */
export interface TouristSpotCreateData {
  title: string;
  description: string;
  location: string;
  category: string;
  price: number;
  images: string[];
  amenities?: string[];
  duration?: string;
  maxCapacity?: number;
  coordinates?: TouristSpot["coordinates"];
  tags?: string[];
  featured?: boolean;
}

/**
 * TouristSpot Update Data Interface
 * Used for updating existing tourist spots
 */
export interface TouristSpotUpdateData extends Partial<TouristSpotCreateData> {
  isActive?: boolean;
}

/**
 * TouristSpot Search Filters Interface
 */
export interface TouristSpotFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  featured?: boolean;
  isActive?: boolean;
}

/**
 * TouristSpot Collection Name
 * MongoDB collection name for tourist spots
 */
export const TOURIST_SPOT_COLLECTION = "touristspots";

/**
 * TouristSpot Categories
 * Predefined categories for tourist spots
 */
export const TOURIST_SPOT_CATEGORIES = [
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
] as const;

export type TouristSpotCategory = typeof TOURIST_SPOT_CATEGORIES[number];

/**
 * TouristSpot Validation Rules
 * Defines validation rules for tourist spot data
 */
export const TouristSpotValidation = {
  title: {
    minLength: 3,
    maxLength: 100,
  },
  description: {
    minLength: 10,
    maxLength: 1000,
  },
  location: {
    minLength: 3,
    maxLength: 100,
  },
  price: {
    min: 0,
    max: 100000,
  },
  images: {
    minCount: 1,
    maxCount: 10,
  },
  rating: {
    min: 1,
    max: 5,
  },
} as const;
