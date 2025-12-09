import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

/**
 * GET /api/shared/spots
 *
 * Fetch all tourist spots from MongoDB Atlas
 * Returns spots sorted by creation date (newest first)
 */
export async function GET(request: NextRequest) {
  try {
    // Connect to database
    const db = await getDatabase();

    const spotsCollection = db.collection("touristspots");

    // Get search parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    // If requesting a specific spot by ID
    if (id) {
      const spot = await spotsCollection.findOne({ _id: id });

      if (!spot) {
        return NextResponse.json(
          { success: false, message: "Spot not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: spot });
    }

    // Build query for filtering spots
    let query: any = {};

    // Add search filter if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ];
    }

    // Add category filter if provided
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    // Fetch spots with filters and sorting
    const spots = await spotsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: spots,
      count: spots.length
    });

  } catch (error) {
    console.error("Error fetching spots:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tourist spots",
        error: process.env.NODE_ENV === "development" ? error : undefined
      },
      { status: 500 }
    );
  }
}
