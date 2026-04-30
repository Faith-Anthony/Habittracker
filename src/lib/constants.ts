// App constants

export const APP_NAME = "HabitFlow";
export const APP_VERSION = "2.4.0";
export const APP_DESCRIPTION = "Master your routines with mindful precision and quiet discipline";

// Color scheme
export const COLORS = {
  primary: "#7c3aed",
  secondary: "#f3f4f6",
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
};

// Habit frequencies
export const FREQUENCIES = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
};

// Habit categories
export const CATEGORIES = {
  HEALTH: "health",
  PRODUCTIVITY: "productivity",
  MINDFULNESS: "mindfulness",
  FITNESS: "fitness",
  LEARNING: "learning",
  SOCIAL: "social",
};

// Storage keys
export const STORAGE_KEYS = {
  USER: "habit_tracker_user",
  HABITS: "habit_tracker_habits",
  ENTRIES: "habit_tracker_entries",
  STREAKS: "habit_tracker_streaks",
};

// API endpoints (for Phase 2+)
export const API_ENDPOINTS = {
  AUTH_LOGIN: "/api/auth/login",
  AUTH_SIGNUP: "/api/auth/signup",
  AUTH_LOGOUT: "/api/auth/logout",
  HABITS_GET: "/api/habits",
  HABITS_CREATE: "/api/habits",
  HABITS_UPDATE: "/api/habits/:id",
  HABITS_DELETE: "/api/habits/:id",
};

// Toast messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: "Successfully logged in!",
  SIGNUP_SUCCESS: "Account created successfully!",
  HABIT_CREATED: "Habit created successfully!",
  HABIT_UPDATED: "Habit updated successfully!",
  HABIT_DELETED: "Habit deleted successfully!",
  ERROR_GENERIC: "Something went wrong. Please try again.",
};
