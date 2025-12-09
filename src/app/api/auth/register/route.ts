import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDatabase } from "@/lib/mongodb";
import { UserValidation } from "@/lib/models/User";

/**
 * User Registration API Route
 *
 * Handles user registration with validation and password hashing
 * Creates new user accounts in the database
 */

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Validate name
    if (name.length < UserValidation.name.minLength || name.length > UserValidation.name.maxLength) {
      return NextResponse.json(
        { error: `Name must be between ${UserValidation.name.minLength} and ${UserValidation.name.maxLength} characters` },
        { status: 400 }
      );
    }

    // Validate email format
    if (!UserValidation.email.pattern.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password
    if (password.length < UserValidation.password.minLength) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    if (!UserValidation.password.pattern.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one uppercase letter, one lowercase letter, and one number" },
        { status: 400 }
      );
    }

    // Connect to database
    const db = await getDatabase();

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user document
    const userDocument = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "user", // Default role
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert user into database
    const result = await db.collection("users").insertOne(userDocument);

    if (!result.acknowledged) {
      throw new Error("Failed to create user");
    }

    // Return success response (without password)
    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: result.insertedId.toString(),
        name: userDocument.name,
        email: userDocument.email,
        role: userDocument.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
