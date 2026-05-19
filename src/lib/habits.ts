// Habits utilities using Supabase

import { Habit, HabitEntry } from "@/types/habit";
import { supabase, SupabaseHabit, SupabaseCompletion } from "./supabase";
import { getCurrentUser } from "./auth";
import { getTodayString } from "./dates";

// ==================== HABIT CRUD ====================

export async function getHabits(): Promise<Habit[]> {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", user.userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  // Convert Supabase habits to Habit type with completions
  const habits = (data as SupabaseHabit[]) || [];
  return Promise.all(habits.map((h) => convertToHabit(h)));
}

export async function getUserHabits(userId: string): Promise<Habit[]> {
  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  const habits = (data as SupabaseHabit[]) || [];
  return Promise.all(habits.map((h) => convertToHabit(h)));
}

export async function createHabit(data: {
  name: string;
  description?: string;
  frequency?: string;
  color?: string;
}): Promise<Habit> {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not authenticated");

  if (!data.name || data.name.trim() === "") {
    throw new Error("Habit name is required");
  }

  const { data: newHabit, error } = await supabase
    .from("habits")
    .insert([
      {
        user_id: user.userId,
        name: data.name.trim(),
        description: data.description?.trim() || "",
        frequency: data.frequency || "daily",
        color: data.color || "#7c3aed",
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return convertToHabit(newHabit as SupabaseHabit);
}

export async function getHabitById(id: string): Promise<Habit | null> {
  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  if (!data) return null;

  return convertToHabit(data as SupabaseHabit);
}

export async function updateHabit(habitId: string, updates: Partial<Habit>): Promise<Habit> {
  const updateData: Record<string, any> = {};

  if (updates.name) updateData.name = updates.name;
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.frequency) updateData.frequency = updates.frequency;
  if (updates.color) updateData.color = updates.color;

  updateData.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("habits")
    .update(updateData)
    .eq("id", habitId)
    .select()
    .single();

  if (error) throw error;

  return convertToHabit(data as SupabaseHabit);
}

export async function deleteHabit(habitId: string): Promise<void> {
  const { error } = await supabase.from("habits").delete().eq("id", habitId);

  if (error) throw error;
}

// ==================== COMPLETION TRACKING ====================

export async function toggleHabitCompletion(
  habit: Habit,
  date: string = getTodayString()
): Promise<Habit> {
  const isCompleted = habit.completions.includes(date);

  if (isCompleted) {
    // Remove completion
    const { error } = await supabase
      .from("completions")
      .delete()
      .eq("habit_id", habit.id)
      .eq("date", date);

    if (error) throw error;
  } else {
    // Add completion
    const { error } = await supabase
      .from("completions")
      .insert([
        {
          habit_id: habit.id,
          date,
        },
      ]);

    if (error) throw error;
  }

  // Return updated habit
  return getHabitById(habit.id) as Promise<Habit>;
}

export async function isHabitCompletedToday(habit: Habit): Promise<boolean> {
  const today = getTodayString();
  return habit.completions.includes(today);
}

// ==================== UTILITY FUNCTIONS ====================

async function convertToHabit(supabaseHabit: SupabaseHabit): Promise<Habit> {
  // Fetch all completions for this habit
  const { data: completions, error } = await supabase
    .from("completions")
    .select("date")
    .eq("habit_id", supabaseHabit.id);

  if (error) throw error;

  const dates = (completions as SupabaseCompletion[]).map((c) => c.date);

  return {
    id: supabaseHabit.id,
    userId: supabaseHabit.user_id,
    name: supabaseHabit.name,
    description: supabaseHabit.description || "",
    frequency: supabaseHabit.frequency,
    createdAt: supabaseHabit.created_at,
    completions: dates,
    color: supabaseHabit.color,
  };
}

// ==================== PHASE 4 COMPATIBILITY ====================

export function logHabitEntry(_entry: HabitEntry): void {
  // Phase 4: Implement habit entry logic
  console.log("Log Entry Phase 4");
}

export function getHabitEntries(_habitId: string): HabitEntry[] {
  // Phase 4: Implement habit entries retrieval
  return [];
}
