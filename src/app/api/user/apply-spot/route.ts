import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/nextauth";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * POST /api/user/apply-spot
 *
 * Submit an application for a tourist spot
 * Requires authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { spotId } = await request.json();

    if (!spotId) {
      return NextResponse.json(
        { success: false, message: "Spot ID is required" },
        { status: 400 }
      );
    }

    const db = getDatabase();

    // Find user by email
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if spot exists
    const spotsCollection = db.collection("touristspots");
    const spot = await spotsCollection.findOne({
      _id: typeof spotId === 'string' ? new ObjectId(spotId) : spotId
    });

    if (!spot) {
      return NextResponse.json(
        { success: false, message: "Spot not found" },
        { status: 404 }
      );
    }

    // Check if user already applied for this spot
    const applicationsCollection = db.collection("userapplications");
    const existingApplication = await applicationsCollection.findOne({
      userId: user._id,
      spotId: typeof spotId === 'string' ? new ObjectId(spotId) : spotId
    });

    if (existingApplication) {
      return NextResponse.json(
        { success: false, message: "You have already applied for this spot" },
        { status: 409 }
      );
    }

    // Create new application
    const applicationData = {
      userId: user._id,
      spotId: typeof spotId === 'string' ? new ObjectId(spotId) : spotId,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await applicationsCollection.insertOne(applicationData);

    if (!result.acknowledged) {
      throw new Error("Failed to create application");
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      applicationId: result.insertedId,
    });

  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application",
        error: process.env.NODE_ENV === "development" ? error : undefined
      },
      { status: 500 }
    );
  }
}
