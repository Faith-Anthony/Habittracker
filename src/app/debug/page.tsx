"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  email: string;
  created_at: string;
}

interface Habit {
  id: string;
  user_id: string;
  name: string;
  frequency: string;
  created_at: string;
}

interface Completion {
  id: string;
  habit_id: string;
  date: string;
  created_at: string;
}

export default function DebugDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "habits" | "completions">("users");

  useEffect(() => {
    loadData();
    // Refresh data every 5 seconds
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      // Load users from auth
      const { data: authData } = await supabase.auth.admin
        .listUsers()
        .catch(() => ({ data: null, error: "Admin access denied" }));

      if (authData?.users) {
        setUsers(
          authData.users.map((u) => ({
            id: u.id,
            email: u.email || "no-email",
            created_at: u.created_at,
          }))
        );
      }

      // Load habits
      const { data: habitsData } = await supabase
        .from("habits")
        .select("*")
        .order("created_at", { ascending: false });

      if (habitsData) {
        setHabits(habitsData as Habit[]);
      }

      // Load completions
      const { data: completionsData } = await supabase
        .from("completions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (completionsData) {
        setCompletions(completionsData as Completion[]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading debug data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🔧 Debug Dashboard</h1>
          <p className="text-gray-400">Monitor your Supabase database in real-time</p>
          <p className="text-xs text-gray-500 mt-2">Auto-refreshes every 5 seconds</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "users"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            👥 Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab("habits")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "habits"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            🎯 Habits ({habits.length})
          </button>
          <button
            onClick={() => setActiveTab("completions")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "completions"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            ✅ Completions ({completions.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === "users" && (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-800 border-b border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">User ID</th>
                    <th className="px-4 py-3 text-left">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-center text-gray-500">
                        No users yet. Sign up in your app!
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800">
                        <td className="px-4 py-3 text-blue-400">{user.email}</td>
                        <td className="px-4 py-3 text-gray-400 font-mono text-xs">
                          {user.id.substring(0, 8)}...
                        </td>
                        <td className="px-4 py-3 text-gray-400">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "habits" && (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-800 border-b border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Frequency</th>
                    <th className="px-4 py-3 text-left">User ID</th>
                    <th className="px-4 py-3 text-left">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {habits.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-3 text-center text-gray-500">
                        No habits yet. Create one in your app!
                      </td>
                    </tr>
                  ) : (
                    habits.map((habit) => (
                      <tr key={habit.id} className="border-b border-gray-800 hover:bg-gray-800">
                        <td className="px-4 py-3 font-semibold">{habit.name}</td>
                        <td className="px-4 py-3 text-gray-400">{habit.frequency}</td>
                        <td className="px-4 py-3 text-gray-400 font-mono text-xs">
                          {habit.user_id.substring(0, 8)}...
                        </td>
                        <td className="px-4 py-3 text-gray-400">
                          {new Date(habit.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "completions" && (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-800 border-b border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Habit ID</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Logged</th>
                  </tr>
                </thead>
                <tbody>
                  {completions.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-center text-gray-500">
                        No completions yet. Complete a habit in your app!
                      </td>
                    </tr>
                  ) : (
                    completions.map((completion) => (
                      <tr
                        key={completion.id}
                        className="border-b border-gray-800 hover:bg-gray-800"
                      >
                        <td className="px-4 py-3 text-gray-400 font-mono text-xs">
                          {completion.habit_id.substring(0, 8)}...
                        </td>
                        <td className="px-4 py-3 text-green-400 font-semibold">
                          {completion.date}
                        </td>
                        <td className="px-4 py-3 text-gray-400">
                          {new Date(completion.created_at).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
          <div className="bg-gray-800 p-4 rounded">
            <div className="text-gray-400 text-sm">Total Users</div>
            <div className="text-2xl font-bold text-blue-400">{users.length}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <div className="text-gray-400 text-sm">Total Habits</div>
            <div className="text-2xl font-bold text-green-400">{habits.length}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <div className="text-gray-400 text-sm">Total Completions</div>
            <div className="text-2xl font-bold text-yellow-400">{completions.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
