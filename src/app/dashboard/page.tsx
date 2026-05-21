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
    const loadData = async () => {
      try {
        const session = await getCurrentUser();
        setUser(session);

        if (session) {
          const userHabits = await getUserHabits(session.userId);
          setHabits(userHabits);
        }
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleFormSuccess = async () => {
    if (user) {
      const userHabits = await getUserHabits(user.userId);
      setHabits(userHabits);
    }
    setShowForm(false);
    setEditingHabit(null);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  };

  const handleDeleteHabit = async (habitId: string) => {
    try {
      await deleteHabit(habitId);
      if (user) {
        const userHabits = await getUserHabits(user.userId);
        setHabits(userHabits);
      }
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const handleUpdateHabit = (updatedHabit: Habit) => {
    // Update the habits state with the updated habit
    const updatedHabits = habits.map((h) =>
      h.id === updatedHabit.id ? updatedHabit : h
    );
    setHabits(updatedHabits);
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
      className="min-h-screen bg-white dark:bg-slate-950 px-4 py-8 sm:px-6"
    >
      {/* Logout Button - Accessible and Mobile-friendly */}
      <div className="flex justify-end mb-6 sm:mb-8 z-40">
        <button
          data-testid="auth-logout-button"
          onClick={handleLogoutClick}
          aria-label="Logout from account"
          className="bg-red-500 hover:bg-red-600 focus:bg-red-600 active:bg-red-700 text-white font-semibold py-2 px-4 sm:py-2 sm:px-6 rounded-lg transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
        >
          Logout
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl" aria-hidden="true">⚠️</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
              Confirm Logout?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-center mb-6 text-sm sm:text-base">
              Are you sure you want to log out? You will need to sign in again to access your habits.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleConfirmLogout}
                className="w-full bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800 text-white font-semibold py-3 rounded-lg transition-all"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 focus:bg-slate-50 dark:focus:bg-slate-800 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="mb-4 sm:mb-6 flex justify-center">
            <div className="bg-white dark:bg-slate-800 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg flex-shrink-0">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10"
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

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
            My Habits
          </h1>

          {user && (
            <p className="text-violet-600 dark:text-violet-400 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
              Welcome, {user.email}
            </p>
          )}

          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Build routines, track progress, master your goals
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Create Habit Section */}
          {!showForm ? (
            <button
              data-testid="create-habit-button"
              onClick={() => setShowForm(true)}
              className="w-full bg-violet-600 hover:bg-violet-700 focus:bg-violet-700 active:bg-violet-800 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span className="text-lg sm:text-xl">+</span>
              Create New Habit
            </button>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
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
              className="bg-white dark:bg-slate-900 rounded-xl p-8 sm:p-12 text-center border border-slate-200 dark:border-slate-800"
            >
              <div className="mb-4 text-4xl sm:text-5xl" aria-hidden="true">📝</div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                No Habits Yet
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm sm:text-base">
                Create your first habit to get started on your journey to better routines.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-violet-600 hover:bg-violet-700 focus:bg-violet-700 active:bg-violet-800 text-white font-semibold py-2 px-6 rounded-xl transition-all text-sm sm:text-base"
              >
                Create Habit
              </button>
            </div>
          ) : (
            habits.length > 0 && (
              <div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3 sm:mb-4">
                  {habits.length} habit{habits.length !== 1 ? "s" : ""} • Tap to manage
                </p>
                <HabitList
                  habits={habits}
                  onEdit={handleEditHabit}
                  onDelete={handleDeleteHabit}
                  onUpdate={handleUpdateHabit}
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
