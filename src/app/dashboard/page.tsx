"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout, getCurrentUser } from "@/lib/auth";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { useState, useEffect } from "react";

function DashboardContent() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = getCurrentUser();
    setUser(session);
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      data-testid="dashboard-page"
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-8"
    >
      {/* Logout Button - Top Right */}
      <button
        data-testid="auth-logout-button"
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
      >
        Logout
      </button>

      <div className="text-center max-w-md w-full">
        <div className="mb-8 flex justify-center">
          <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              {/* Target/Growth circles */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.3" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.6" />
              <circle cx="50" cy="50" r="15" fill="#8B5CF6" />
              
              {/* Arrow pointing up - growth indicator */}
              <path d="M 50 40 L 55 25 L 50 30 L 45 25 Z" fill="#EC4899" />
              
              {/* Decorative sparkles */}
              <circle cx="70" cy="35" r="2" fill="#F472B6" opacity="0.8" />
              <circle cx="30" cy="35" r="2" fill="#A78BFA" opacity="0.8" />
              <circle cx="75" cy="50" r="1.5" fill="#F472B6" opacity="0.6" />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 leading-tight">
          Dashboard
        </h1>

        <p className="text-gray-600 text-lg md:text-xl mb-6 leading-relaxed">
          Welcome to HabitFlow. Your journey to mindful routines starts here.
        </p>

        {user && (
          <p className="text-purple-600 font-semibold mb-4">
            Logged in as: {user.email}
          </p>
        )}

        <p className="text-gray-500 text-sm mb-10">
          Phase 2 Active • Authentication Complete • Session Protected
        </p>

        {/* Status Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
          <h2 className="font-bold text-gray-900 mb-4 text-lg">Phase 2 Status</h2>
          <div className="space-y-3 text-sm text-left">
            <div className="flex items-center">
              <span className="text-green-500 mr-3 font-bold">✓</span>
              <span className="text-gray-700">User authentication</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-3 font-bold">✓</span>
              <span className="text-gray-700">Session management</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-3 font-bold">✓</span>
              <span className="text-gray-700">Route protection</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-3 font-bold">✓</span>
              <span className="text-gray-700">localStorage integration</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">⊝</span>
              <span className="text-gray-500">Habit management (Phase 3)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
