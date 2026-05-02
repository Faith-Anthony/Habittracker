"use client";

import { Habit } from "@/types/habit";
import HabitCard from "./HabitCard";

interface HabitListProps {
  habits: Habit[];
  onEdit?: (habit: Habit) => void;
  onDelete?: (habitId: string) => void;
  onUpdate?: (habit: Habit) => void;
}

export default function HabitList({
  habits,
  onEdit,
  onDelete,
  onUpdate,
}: HabitListProps) {
  if (habits.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onEdit={onEdit}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
