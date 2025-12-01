// /app/dashboard/[id]/notifications/page.js

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Bell,
  BellOff,
  Settings,
  Construction,
  Clock,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Info,
  Mail,
  Wrench,
  Users
} from "lucide-react";

export default function NotificationsPage() {
  const params = useParams();
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    paymentAlerts: true,
    systemUpdates: true,
    marketing: false
  });

  const toggleSetting = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">
                Manage your alerts and notification preferences
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg">
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </div>

      {/* Under Construction Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Construction className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Notifications Center Under Construction
            </h3>
            <p className="text-yellow-700 mb-3">
              We're building a comprehensive notifications system to keep you informed about
              important updates, payment statuses, and farming activities. This feature will
              include real-time alerts, customizable preferences, and multiple delivery channels.
            </p>
            <div className="flex items-center gap-2 text-sm text-yellow-600">
              <Clock className="h-4 w-4" />
              <span>Expected to launch in the next update</span>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}