"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  TrendingUp,
  Calendar,
  Package,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  History,
  Sprout,
  Droplets,
  Thermometer,
  BarChart3,
  User,
  MapPin,
  Phone,
  Mail,
  Crop,
  Fish,
  Clock4,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [farmerDetails, setFarmerDetails] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentPayments, setRecentPayments] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const farmerToken = localStorage.getItem("farmerToken");
        const currentFarmer = JSON.parse(
          localStorage.getItem("currentFarmer") || "null"
        );

        if (!farmerToken || !currentFarmer) {
          return;
        }

        setUser(currentFarmer);

        // Fetch complete farmer details
        const farmerResponse = await fetch(`${API_URL}/api/farmer/profile`, {
          headers: {
            Authorization: `Bearer ${farmerToken}`,
            "Content-Type": "application/json",
          },
        });

        if (farmerResponse.ok) {
          const farmerData = await farmerResponse.json();
          setFarmerDetails(farmerData.data);
        }

        // Fetch dashboard stats
        const statsResponse = await fetch(
          `${API_URL}/api/farmer/dashboard/stats`,
          {
            headers: {
              Authorization: `Bearer ${farmerToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData.data);
        }

        // Fetch recent payments
        const paymentsResponse = await fetch(
          `${API_URL}/api/farmer/payments/recent`,
          {
            headers: {
              Authorization: `Bearer ${farmerToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (paymentsResponse.ok) {
          const paymentsData = await paymentsResponse.json();
          setRecentPayments(paymentsData.data || []);
        }

        // Fetch crops/farming activities
        const cropsResponse = await fetch(`${API_URL}/api/farmer/crops`, {
          headers: {
            Authorization: `Bearer ${farmerToken}`,
            "Content-Type": "application/json",
          },
        });

        if (cropsResponse.ok) {
          const cropsData = await cropsResponse.json();
          setCrops(cropsData.data || []);
        }

        // Fetch recent activities
        const activitiesResponse = await fetch(
          `${API_URL}/api/farmer/activities/recent`,
          {
            headers: {
              Authorization: `Bearer ${farmerToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (activitiesResponse.ok) {
          const activitiesData = await activitiesResponse.json();
          setRecentActivities(activitiesData.data || []);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [params.id]);

  const handleNavigation = (path) => {
    router.push(`/dashboard/${user?.id}${path}`);
  };

  const getPaymentStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "Processing":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "Failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "Processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Failed":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
  };

  const getActivityStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock4 className="h-4 w-4 text-blue-500" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock4 className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200";
      case "in-progress":
        return "bg-blue-50 border-blue-200";
      case "pending":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section with Farmer Profile */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 mb-4">
              Here's what's happening with your farming activities today.
            </p>

            {/* Farmer Basic Info */}
            {farmerDetails && (
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{farmerDetails.address}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{farmerDetails.phone}</span>
                </div>
                {farmerDetails.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{farmerDetails.email}</span>
                  </div>
                )}
                {farmerDetails.farmSize && (
                  <div className="flex items-center gap-1">
                    <Crop className="h-4 w-4" />
                    <span>{farmerDetails.farmSize}</span>
                  </div>
                )}
                {farmerDetails.farmType && (
                  <div className="flex items-center gap-1">
                    <Fish className="h-4 w-4" />
                    <span>{farmerDetails.farmType}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-3 bg-green-50 rounded-lg p-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-900">User ID</p>
                <p className="text-xs text-green-700">{user?.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Comprehensive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Projects */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Active Projects
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.activeProjects || crops.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Pending Payments
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.pendingPayments || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Total Paid */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Paid</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{stats?.totalPaid || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Next Due */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Next Due</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.nextDue ? `₹${stats.nextDue}` : "₹0"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities - Farming Operations */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Recent Farming Activities
            </h3>
            <button className="text-sm text-primary hover:underline">
              View All
            </button>
          </div>

          {recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 border rounded-lg ${getActivityStatusColor(
                    activity.status
                  )}`}
                >
                  <div className="flex items-center space-x-3">
                    {getActivityStatusIcon(activity.status)}
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(activity.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Default farming activities */}
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Rice cultivation
                    </p>
                    <p className="text-sm text-gray-600">Watering completed</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock4 className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">Wheat field</p>
                    <p className="text-sm text-gray-600">
                      Fertilizer application needed
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Vegetable garden
                    </p>
                    <p className="text-sm text-gray-600">
                      Harvest ready tomorrow
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
            </div>
          )}
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Recent Payments
            </h3>
            <button
              onClick={() => handleNavigation("/payment-history")}
              className="text-sm text-primary hover:underline"
            >
              View All
            </button>
          </div>

          {recentPayments.length > 0 ? (
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div
                  key={payment._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleNavigation(`/payments`)}
                >
                  <div className="flex items-center space-x-4">
                    {getPaymentStatusIcon(payment.paymentStatus)}
                    <div>
                      <p className="font-medium text-gray-900">
                        {payment.paymentTitle}
                      </p>
                      <p className="text-sm text-gray-500">
                        Amount: ₹{payment.amount} •{" "}
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(
                        payment.paymentStatus
                      )}`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No payments found</p>
              <p className="text-sm text-gray-400 mt-1">
                Your payment history will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Farming Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crop/Fish Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sprout className="h-5 w-5 text-green-600" />
            Current Crops/Fish
          </h3>
          <div className="space-y-3">
            {crops.length > 0 ? (
              crops.map((crop, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{crop.name}</p>
                    <p className="text-sm text-gray-600">
                      {crop.type} • {crop.area}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      crop.status === "harvest-ready"
                        ? "bg-green-100 text-green-800"
                        : crop.status === "growing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {crop.status}
                  </span>
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Rice Paddy</p>
                    <p className="text-sm text-gray-600">Crop • 2 acres</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    Growing
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Tilapia Fish</p>
                    <p className="text-sm text-gray-600">Fish • 1 pond</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Harvest Ready
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Weather/Water Conditions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-orange-600" />
            Farm Conditions
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Water Level</span>
              <span className="flex items-center gap-1 text-blue-600">
                <Droplets className="h-4 w-4" />
                Optimal
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Temperature</span>
              <span className="text-gray-900">28°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Humidity</span>
              <span className="text-gray-900">65%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Soil pH</span>
              <span className="text-gray-900">6.8</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => handleNavigation("/payments")}
              className="w-full flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
            >
              <CreditCard className="h-6 w-6 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Make a Payment</p>
                <p className="text-sm text-gray-500">Pay for your projects</p>
              </div>
            </button>

            <button
              onClick={() => handleNavigation("/payments")}
              className="w-full flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
            >
              <History className="h-6 w-6 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">
                  View Payment History
                </p>
                <p className="text-sm text-gray-500">Check all transactions</p>
              </div>
            </button>

            <button
              onClick={() => handleNavigation("/profile")}
              className="w-full flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
            >
              <User className="h-6 w-6 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Update Profile</p>
                <p className="text-sm text-gray-500">Manage your information</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
