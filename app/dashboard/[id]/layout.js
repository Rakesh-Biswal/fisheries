"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FarmerSidebar } from "@/components/farmer-sidebar";

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const farmerToken = localStorage.getItem("farmerToken");
        const currentFarmer = JSON.parse(
          localStorage.getItem("currentFarmer") || "null"
        );

        if (!farmerToken || !currentFarmer) {
          console.log("No token or farmer found, redirecting to signin");
          router.push("/signin");
          return;
        }

        // Verify the ID in URL matches the logged-in farmer
        if (params.id !== currentFarmer.id) {
          console.warn("URL ID doesn't match logged-in farmer ID");
          console.log("URL ID:", params.id, "Farmer ID:", currentFarmer.id);
          // Redirect to correct dashboard
          router.push(`/dashboard/${currentFarmer.id}`);
          return;
        }

        setUser(currentFarmer);
        console.log(
          "✅ Farmer authenticated and ID matches:",
          currentFarmer.name
        );
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to ensure DOM is ready
    setTimeout(checkAuth, 100);
  }, [router, params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <FarmerSidebar user={user} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}