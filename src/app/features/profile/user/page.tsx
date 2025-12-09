"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Shield, Calendar, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MainLayout } from "@/components/layouts/MainLayout";

/**
 * User Profile Page
 *
 * Displays user profile information with modern design
 * Shows user details, role, and account information
 */

export default function UserProfilePage() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <MainLayout>
        <div className="container-responsive py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
          <Button asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container-responsive py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Your Profile
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{session.user.name}</h2>
                <Badge variant="secondary" className="mb-4">
                  <Shield className="h-3 w-3 mr-1" />
                  {session.user.role || "User"}
                </Badge>
                <Button asChild className="w-full">
                  <Link href="/features/profile/user/update">
                    Update Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email */}
                <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium">{session.user.email}</p>
                  </div>
                </div>

                {/* Name */}
                <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mr-4">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{session.user.name}</p>
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mr-4">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Account Type</p>
                    <p className="font-medium capitalize">{session.user.role || "User"}</p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mr-4">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Dashboard
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  <MapPin className="h-4 w-4 mr-2" />
                  Browse Spots
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
