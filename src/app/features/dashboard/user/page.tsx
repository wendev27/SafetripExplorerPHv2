"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, CheckCircle, Clock, XCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MainLayout } from "@/components/layouts/MainLayout";

/**
 * User Dashboard Page
 *
 * Shows user's spot applications, bookings, and profile overview
 * Features modern design with animations and responsive layout
 */

interface Application {
  _id: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  spotId: {
    _id: string;
    title: string;
    description: string;
    location: string;
    category: string;
    price: number;
    images: string[];
    rating?: number;
  };
}

interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
}

export default function UserDashboard() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch user applications
  useEffect(() => {
    const fetchApplications = async () => {
      if (!session?.user) return;

      try {
        const response = await fetch("/api/user/me");
        if (!response.ok) throw new Error("Failed to fetch applications");

        const data = await response.json();
        if (data.success) {
          const apps = data.data || [];
          setApplications(apps);

          // Calculate stats
          setStats({
            totalApplications: apps.length,
            pendingApplications: apps.filter((app: Application) => app.status === "pending").length,
            acceptedApplications: apps.filter((app: Application) => app.status === "accepted").length,
            rejectedApplications: apps.filter((app: Application) => app.status === "rejected").length,
          });
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [session]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <MainLayout>
      <div className="container-responsive py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {session?.user?.name}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your spot applications and explore new destinations
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {stats.totalApplications}
              </div>
              <p className="text-sm text-muted-foreground">Total Applications</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {stats.pendingApplications}
              </div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {stats.acceptedApplications}
              </div>
              <p className="text-sm text-muted-foreground">Accepted</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {stats.rejectedApplications}
              </div>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          <Button asChild>
            <Link href="/">
              <MapPin className="h-4 w-4 mr-2" />
              Browse Spots
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/profile">
              <Star className="h-4 w-4 mr-2" />
              Update Profile
            </Link>
          </Button>
        </motion.div>

        {/* Applications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                My Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading your applications...</p>
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start exploring amazing tourist spots and submit your first application!
                  </p>
                  <Button asChild>
                    <Link href="/">Browse Available Spots</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {applications.map((application, index) => (
                    <motion.div
                      key={application._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <img
                            src={application.spotId.images?.[0] || "/placeholder-spot.jpg"}
                            alt={application.spotId.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 right-4">
                            <Badge className={`flex items-center gap-1 ${getStatusColor(application.status)}`}>
                              {getStatusIcon(application.status)}
                              {application.status}
                            </Badge>
                          </div>
                        </div>

                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                            {application.spotId.title}
                          </h3>

                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            {application.spotId.location}
                          </div>

                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline">{application.spotId.category}</Badge>
                            <span className="font-bold text-primary">
                              ₱{application.spotId.price.toLocaleString()}
                            </span>
                          </div>

                          <p className="text-xs text-muted-foreground mb-4">
                            Applied on {new Date(application.createdAt).toLocaleDateString()}
                          </p>

                          <Button asChild className="w-full">
                            <Link href={`/spots/${application.spotId._id}`}>
                              View Details
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
