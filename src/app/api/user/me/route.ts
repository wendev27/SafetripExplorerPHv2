import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/nextauth";
import { getDatabase } from "@/lib/mongodb";

/**
 * GET /api/user/me
 *
 * Get current user's applications and profile information
 * Requires authentication
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
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

    // Get user's applications
    const applicationsCollection = db.collection("userapplications");
    const applications = await applicationsCollection
      .find({ userId: user._id })
      .sort({ createdAt: -1 })
      .toArray();

    // Populate spot information for each application
    const spotsCollection = db.collection("touristspots");
    const applicationsWithSpots = await Promise.all(
      applications.map(async (application) => {
        const spot = await spotsCollection.findOne({ _id: application.spotId });
        return {
          ...application,
          spotId: spot || application.spotId, // Fallback if spot not found
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: applicationsWithSpots,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user data",
        error: process.env.NODE_ENV === "development" ? error : undefined
      },
      { status: 500 }
    );
  }
}
