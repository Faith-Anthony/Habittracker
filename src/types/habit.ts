// Phase 3: Type definitions for habits

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description: string;
  frequency: string;
  createdAt: string;
  completions: string[];
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
