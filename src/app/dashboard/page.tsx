"use client";

import { useRouter } from "next/navigation";
import { logout, getCurrentUser } from "@/lib/auth";
import { getUserHabits, deleteHabit } from "@/lib/habits";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import HabitList from "@/components/habits/HabitList";
import HabitForm from "@/components/habits/HabitForm";
import { Habit } from "@/types/habit";
import { useState, useEffect } from "react";

function DashboardContent() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const session = getCurrentUser();
    setUser(session);

    if (session) {
      const userHabits = getUserHabits(session.userId);
      setHabits(userHabits);
    }

    setIsLoading(false);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    logout();
    router.push("/login");
  };

  const handleFormSuccess = () => {
    if (user) {
      const userHabits = getUserHabits(user.userId);
      setHabits(userHabits);
    }
    setShowForm(false);
    setEditingHabit(null);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  };

  const handleDeleteHabit = (habitId: string) => {
    deleteHabit(habitId);
    if (user) {
      const userHabits = getUserHabits(user.userId);
      setHabits(userHabits);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingHabit(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      data-testid="dashboard-page"
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-8"
    >
      {/* Logout Button - Top Right */}
      <button
        data-testid="auth-logout-button"
        onClick={handleLogoutClick}
        className="fixed top-6 right-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 z-40"
      >
        Logout
      </button>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
              Confirm Logout?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to log out? You will need to sign in again to access your habits.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleConfirmLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full border-2 border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto pt-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mb-6 flex justify-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="45" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.3" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.6" />
                <circle cx="50" cy="50" r="15" fill="#8B5CF6" />
                <path d="M 50 40 L 55 25 L 50 30 L 45 25 Z" fill="#EC4899" />
                <circle cx="70" cy="35" r="2" fill="#F472B6" opacity="0.8" />
                <circle cx="30" cy="35" r="2" fill="#A78BFA" opacity="0.8" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">
            My Habits
          </h1>

          {user && (
            <p className="text-purple-600 font-semibold mb-2">
              Welcome, {user.email}
            </p>
          )}

          <p className="text-gray-600 text-sm">
            Build routines, track progress, master your goals
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Create Habit Section */}
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="text-xl">+</span>
              Create New Habit
            </button>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {editingHabit ? "Edit Habit" : "Create New Habit"}
              </h2>
              <HabitForm
                habitId={editingHabit?.id}
                onSuccess={handleFormSuccess}
                onCancel={handleCancel}
              />
            </div>
          )}

          {/* Habits Display */}
          {habits.length === 0 && !showForm ? (
            <div
              data-testid="empty-state"
              className="bg-white rounded-xl shadow-lg p-12 text-center border-2 border-purple-100"
            >
              <div className="mb-4 text-5xl">📝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Habits Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first habit to get started on your journey to better routines.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 px-6 rounded-lg transition-all"
              >
                Create Habit
              </button>
            </div>
          ) : (
            habits.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  {habits.length} habit{habits.length !== 1 ? "s" : ""} • Tap to manage
                </p>
                <HabitList
                  habits={habits}
                  onEdit={handleEditHabit}
                  onDelete={handleDeleteHabit}
                />
              </div>
            )
          )}
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
