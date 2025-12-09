import { ObjectId } from "mongodb";

/**
 * User Model Interface
 *
 * Defines the structure of user documents in the MongoDB database
 * Used for type safety and data validation
 */

export interface User {
  _id: ObjectId | string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "superadmin";
  avatar?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    province?: string;
    zipCode?: string;
  };
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    language: string;
  };
  isActive: boolean;
  emailVerified?: Date;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User Registration Data Interface
 * Used for user registration forms and API endpoints
 */
export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

/**
 * User Login Data Interface
 * Used for user login forms and authentication
 */
export interface UserLoginData {
  email: string;
  password: string;
}

/**
 * User Update Data Interface
 * Used for updating user profile information
 */
export interface UserUpdateData {
  name?: string;
  phone?: string;
  address?: User["address"];
  preferences?: User["preferences"];
  avatar?: string;
}

/**
 * User Roles Enum
 * Defines available user roles in the system
 */
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

/**
 * User Collection Name
 * MongoDB collection name for users
 */
export const USER_COLLECTION = "users";

/**
 * User Validation Rules
 * Defines validation rules for user data
 */
export const UserValidation = {
  name: {
    minLength: 2,
    maxLength: 50,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, // At least one lowercase, uppercase, and number
  },
  phone: {
    pattern: /^\+?[\d\s\-\(\)]+$/,
  },
} as const;
