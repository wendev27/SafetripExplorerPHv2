"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, MapPin, Star, Calendar, Users, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MainLayout } from "@/components/layouts/MainLayout";
import { formatCurrency } from "@/lib/utils";

/**
 * Individual Spot Page
 *
 * Detailed view of a tourist spot with images, information, and booking
 * Modern design with smooth animations and responsive layout
 */

interface Spot {
  _id: string | { $oid: string };
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
  createdAt?: string;
  updatedAt?: string;
}

export default function SpotPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [spot, setSpot] = useState<Spot | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // Fetch spot details
  useEffect(() => {
    const fetchSpot = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/shared/spots?id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch spot");

        const data = await response.json();
        if (data.success && data.data) {
          setSpot(data.data);
        } else {
          throw new Error("Spot not found");
        }
      } catch (error) {
        console.error("Error fetching spot:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpot();
  }, [id]);

  // Check if user has already applied
  useEffect(() => {
    const checkApplication = async () => {
      if (!session?.user || !id) return;

      try {
        const response = await fetch("/api/user/me");
        const data = await response.json();
        if (data.success) {
          const hasAppliedToSpot = data.data?.some((app: any) =>
            (typeof app.spotId === 'string' ? app.spotId : app.spotId?._id) === id
          );
          setHasApplied(hasAppliedToSpot || false);
        }
      } catch (error) {
        console.error("Error checking application:", error);
      }
    };

    checkApplication();
  }, [session, id]);

  const handleApply = async () => {
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }

    setApplying(true);

    try {
      const response = await fetch("/api/user/apply-spot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spotId: id }),
      });

      const data = await response.json();

      if (data.success) {
        setHasApplied(true);
        alert("Application submitted successfully! We'll review it soon.");
      } else {
        alert(data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Application error:", error);
      alert("An error occurred while submitting your application");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container-responsive py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading spot details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!spot) {
    return (
      <MainLayout>
        <div className="container-responsive py-16 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-4">Spot Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The spot you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/spots")}>
            Browse All Spots
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container-responsive py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Spots
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                <Image
                  src={spot.images?.[0] || "/placeholder-spot.jpg"}
                  alt={spot.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Additional Images */}
              {spot.images && spot.images.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {spot.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        alt={`${spot.title} ${index + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {spot.title}
                  </h1>
                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {spot.location}
                  </div>
                </div>
                <Badge variant="outline" className="text-sm">
                  {spot.category}
                </Badge>
              </div>

              {/* Rating */}
              {spot.rating && (
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{spot.rating.toFixed(1)}</span>
                  </div>
                  {spot.reviewCount && (
                    <span className="text-sm text-muted-foreground">
                      ({spot.reviewCount} reviews)
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {spot.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              {spot.duration && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{spot.duration}</p>
                  </CardContent>
                </Card>
              )}

              {spot.maxCapacity && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-medium">Up to {spot.maxCapacity}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Amenities */}
            {spot.amenities && spot.amenities.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Amenities & Features</h3>
                <div className="flex flex-wrap gap-2">
                  {spot.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Price and Action */}
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(spot.price)}
                    </p>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>

                  {hasApplied && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Applied</span>
                    </div>
                  )}
                </div>

                {!session?.user ? (
                  <Button asChild className="w-full" size="lg">
                    <a href="/auth/login">
                      Sign In to Apply
                    </a>
                  </Button>
                ) : hasApplied ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={() => router.push("/dashboard")}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    View Application Status
                  </Button>
                ) : (
                  <Button
                    onClick={handleApply}
                    disabled={applying}
                    className="w-full"
                    size="lg"
                  >
                    {applying ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Submitting...
                      </>
                    ) : (
                      "Apply for this Spot"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
