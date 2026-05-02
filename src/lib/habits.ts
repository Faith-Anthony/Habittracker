// Phase 3: Habits utilities with localStorage

import { Habit, HabitEntry } from "@/types/habit";
import { getFromStorage, saveToStorage } from "./storage";
import { getCurrentUser } from "./auth";

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
    completions: habits[habitIndex].completions,
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

export function logHabitEntry(entry: HabitEntry): void {
  // Phase 4: Implement habit entry logic
  console.log("Log Entry Phase 3+");
}

export function getHabitEntries(habitId: string): HabitEntry[] {
  // Phase 4: Implement habit entries retrieval
  return [];
}
