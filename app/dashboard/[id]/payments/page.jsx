"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Plus,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    fetchPayments();
  }, [params.id, filter]);

  const fetchPayments = async () => {
    try {
      const farmerToken = localStorage.getItem("farmerToken");

      const endpoint =
        filter === "pending" ? "/payments/pending" : "/payments/history";

      const response = await fetch(`${API_URL}/api/farmer${endpoint}`, {
        headers: {
          Authorization: `Bearer ${farmerToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPayments(data.data || []);
      } else {
        console.error("Failed to fetch payments:", response.status);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "Processing":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "Failed":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const handlePaymentClick = (paymentId) => {
    router.push(`/dashboard/${params.id}/payments/${paymentId}`);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading payments...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
            <p className="text-gray-600">
              Manage and track your payment transactions
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "pending"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pending Payments
          </button>
          <button
            onClick={() => setFilter("history")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "history"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Payment History
          </button>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {filter === "pending" ? "Pending Payments" : "Payment History"}
          </h3>
          <span className="text-sm text-gray-500">
            {payments.length} {payments.length === 1 ? "payment" : "payments"}
          </span>
        </div>

        {payments.length > 0 ? (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment._id}
                onClick={() => handlePaymentClick(payment._id)}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {getStatusIcon(payment.paymentStatus)}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {payment.paymentTitle}
                          </h4>
                          <p className="text-gray-600 mt-1">
                            {payment.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            ₹{payment.amount}
                          </p>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(
                              payment.paymentStatus
                            )}`}
                          >
                            {payment.paymentStatus}
                          </span>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <span className="text-sm text-gray-500">Reason</span>
                          <p className="text-sm font-medium text-gray-900">
                            {payment.reasonForPayment}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">
                            Work Status
                          </span>
                          <p className="text-sm font-medium text-gray-900">
                            {payment.workStatus}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Created</span>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Requirements Preview */}
                      {payment.requirements &&
                        payment.requirements.length > 0 && (
                          <div className="mt-4">
                            <span className="text-sm text-gray-500">
                              Requirements:
                            </span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {payment.requirements
                                .slice(0, 3)
                                .map((req, index) => (
                                  <span
                                    key={index}
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                      req.isCompleted
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {req.isCompleted ? "✓ " : "⏳ "}
                                    {req.description}
                                  </span>
                                ))}
                              {payment.requirements.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                                  +{payment.requirements.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePaymentClick(payment._id);
                    }}
                    className="flex items-center space-x-2 text-primary hover:text-primary/80 font-medium"
                  >
                    <span>
                      {payment.paymentStatus === "Pending"
                        ? "Make Payment"
                        : "View Details"}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {filter === "pending" ? "Pending" : ""} Payments
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {filter === "pending"
                ? "You don't have any pending payments at the moment. All your payments are up to date."
                : "Your payment history will appear here once you make payments."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
