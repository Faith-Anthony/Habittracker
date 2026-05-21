import { useState, useMemo } from "react";
import { Habit } from "@/types/habit";
import { createSlug } from "@/lib/slug";
import { toggleHabitCompletion, isHabitCompletedToday } from "@/lib/habits";
import { calculateCurrentStreak, getStreakStatus } from "@/lib/streaks";
import { getHabitIcon } from "@/lib/habitIcons";

interface HabitCardProps {
  habit: Habit;
  onEdit?: (habit: Habit) => void;
  onDelete?: (habitId: string) => void;
  onUpdate?: (habit: Habit) => void;
}

export default function HabitCard({
  habit,
  onEdit,
  onDelete,
  onUpdate,
}: HabitCardProps) {
  const slug = createSlug(habit.name);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const habitIcon = useMemo(() => getHabitIcon(habit.name), [habit.name]);
  const streak = useMemo(() => calculateCurrentStreak(habit.completions), [habit.completions]);
  const streakText = useMemo(() => getStreakStatus(streak), [streak]);

  const handleCompleteClick = async () => {
    try {
      // Toggle completion
      const updatedHabit = await toggleHabitCompletion(habit);
      setIsCompleted(await isHabitCompletedToday(updatedHabit));

      // Update parent
      if (onUpdate) {
        onUpdate(updatedHabit);
      }
    } catch (error) {
      console.error("Error toggling habit completion:", error);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(habit.id);
    }
    setShowDeleteConfirm(false);
  };

  if (showDeleteConfirm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 max-w-sm w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl" aria-hidden="true">🗑️</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
            Delete Habit?
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-6 text-sm sm:text-base">
            Are you sure you want to delete this habit? This action cannot be
            undone and your progress will be lost.
          </p>
          <div className="space-y-3">
            <button
              data-testid="confirm-delete-button"
              onClick={handleConfirmDelete}
              className="w-full bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800 text-white font-semibold py-3 rounded-lg transition-all"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="w-full border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 focus:bg-slate-50 dark:focus:bg-slate-800 active:bg-slate-100 dark:active:bg-slate-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid={`habit-card-${slug}`}
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-5 hover:shadow-md hover:border-violet-200 dark:hover:border-violet-800 transition-all overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4">
        {/* Habit Icon */}
        <div className={`${habitIcon.bgColor} ${habitIcon.color} rounded-lg p-2 flex-shrink-0 w-12 h-12 flex items-center justify-center`}>
          {habitIcon.icon}
        </div>

        {/* Habit Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white break-words">{habit.name}</h3>
          {habit.description && (
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{habit.description}</p>
          )}
          <p className="text-xs text-slate-400 dark:text-slate-600 mt-2">
            {habit.frequency === "daily" ? "Daily Habit" : habit.frequency}
          </p>
        </div>

        {/* Completion Toggle */}
        <button
          data-testid={`habit-complete-${slug}`}
          onClick={handleCompleteClick}
          className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 ${
            isCompleted
              ? "bg-green-500 border-green-600 text-white"
              : "border-slate-300 dark:border-slate-600 text-slate-400 hover:border-violet-500 focus:border-violet-500"
          }`}
          aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
        >
          {isCompleted ? (
            <span className="text-xl">✓</span>
          ) : (
            <span className="text-lg">◯</span>
          )}
        </button>
      </div>

      {/* Streak Display */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 mb-4 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl sm:text-2xl flex-shrink-0" aria-hidden="true">🔥</span>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 dark:text-slate-400">Current Streak</p>
            <p data-testid={`habit-streak-${slug}`} className="text-base sm:text-lg font-bold text-violet-700 dark:text-violet-300 break-words">
              {streakText}
            </p>
          </div>
        </div>
        <span className="text-2xl sm:text-3xl font-bold text-violet-600 dark:text-violet-400 flex-shrink-0">
          {streak}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          data-testid={`habit-edit-${slug}`}
          onClick={() => onEdit?.(habit)}
          className="flex-1 bg-violet-100 dark:bg-violet-900/20 hover:bg-violet-200 dark:hover:bg-violet-900/40 focus:bg-violet-200 dark:focus:bg-violet-900/40 text-violet-700 dark:text-violet-300 font-semibold py-2 sm:py-2.5 rounded-lg transition-all text-sm sm:text-base"
        >
          Edit
        </button>
        <button
          data-testid={`habit-delete-${slug}`}
          onClick={handleDeleteClick}
          className="flex-1 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 focus:bg-red-200 dark:focus:bg-red-900/40 text-red-700 dark:text-red-400 font-semibold py-2 sm:py-2.5 rounded-lg transition-all text-sm sm:text-base"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
