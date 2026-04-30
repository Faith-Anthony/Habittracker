// Phase 2: Type definitions for habits
// Will implement habit types in future phases

export interface Habit {
  id: string;
  title: string;
  description?: string;
  category?: string;
  frequency?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HabitEntry {
  id: string;
  habitId: string;
  date: Date;
  completed: boolean;
}

export interface Streak {
  habitId: string;
  count: number;
  startDate: Date;
  lastUpdated: Date;
}
