// Phase 3/4: Habits utilities with localStorage and completion tracking

import { Habit, HabitEntry } from "@/types/habit";
import { getFromStorage, saveToStorage } from "./storage";
import { getCurrentUser } from "./auth";
import { getTodayString } from "./dates";

const HABITS_KEY = "habit-tracker-habits";

export function getHabits(): Habit[] {
  return getFromStorage(HABITS_KEY) || [];
}

export function saveHabits(habits: Habit[]): void {
  saveToStorage(HABITS_KEY, habits);
}

export function getUserHabits(userId: string): Habit[] {
  const allHabits = getHabits();
  return allHabits.filter((habit) => habit.userId === userId);
}

export function createHabit(data: {
  name: string;
  description?: string;
  frequency?: string;
}): Habit {
  const session = getCurrentUser();
  if (!session) {
    throw new Error("User not authenticated");
  }

  if (!data.name || data.name.trim() === "") {
    throw new Error("Habit name is required");
  }

  const newHabit: Habit = {
    id: Date.now().toString(),
    userId: session.userId,
    name: data.name.trim(),
    description: data.description?.trim() || "",
    frequency: data.frequency || "daily",
    createdAt: new Date().toISOString(),
    completions: [],
  };

  const habits = getHabits();
  habits.push(newHabit);
  saveHabits(habits);

  return newHabit;
}

export function getHabitById(id: string): Habit | null {
  const habits = getHabits();
  return habits.find((habit) => habit.id === id) || null;
}

export function updateHabit(habitId: string, updates: Partial<Habit>): Habit {
  const habits = getHabits();
  const habitIndex = habits.findIndex((h) => h.id === habitId);

  if (habitIndex === -1) {
    throw new Error("Habit not found");
  }

  const updatedHabit: Habit = {
    ...habits[habitIndex],
    name: updates.name || habits[habitIndex].name,
    description: updates.description ?? habits[habitIndex].description,
    frequency: updates.frequency || habits[habitIndex].frequency,
    // Keep original values
    id: habits[habitIndex].id,
    userId: habits[habitIndex].userId,
    createdAt: habits[habitIndex].createdAt,
    completions: updates.completions ?? habits[habitIndex].completions,
  };

  habits[habitIndex] = updatedHabit;
  saveHabits(habits);

  return updatedHabit;
}

export function deleteHabit(habitId: string): void {
  const habits = getHabits();
  const filteredHabits = habits.filter((h) => h.id !== habitId);
  saveHabits(filteredHabits);
}

export function toggleHabitCompletion(
  habit: Habit,
  date: string = getTodayString()
): Habit {
  // Create new completions array without mutating original
  const completions = [...habit.completions];
  const dateIndex = completions.indexOf(date);

  if (dateIndex > -1) {
    // Remove date if it exists
    completions.splice(dateIndex, 1);
  } else {
    // Add date if it doesn't exist
    completions.push(date);
  }

  // Remove duplicates by using Set
  const uniqueCompletions = Array.from(new Set(completions));

  // Return updated habit (not mutating original)
  return {
    ...habit,
    completions: uniqueCompletions,
  };
}

export function isHabitCompletedToday(habit: Habit): boolean {
  const today = getTodayString();
  return habit.completions.includes(today);
}

export function logHabitEntry(_entry: HabitEntry): void {
  // Phase 4: Implement habit entry logic
  console.log("Log Entry Phase 4");
}

export function getHabitEntries(_habitId: string): HabitEntry[] {
  // Phase 4: Implement habit entries retrieval
  return [];
}
