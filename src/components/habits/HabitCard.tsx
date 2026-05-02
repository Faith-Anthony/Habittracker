"use client";

import { useState } from "react";
import { Habit } from "@/types/habit";
import { createSlug } from "@/lib/slug";

interface HabitCardProps {
  habit: Habit;
  onEdit?: (habit: Habit) => void;
  onDelete?: (habitId: string) => void;
}

export default function HabitCard({
  habit,
  onEdit,
  onDelete,
}: HabitCardProps) {
  const slug = createSlug(habit.name);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🗑️</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
            Delete Habit?
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to delete this habit? This action cannot be
            undone and your progress will be lost.
          </p>
          <div className="space-y-3">
            <button
              data-testid="confirm-delete-button"
              onClick={handleConfirmDelete}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="w-full border-2 border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all"
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
      className="bg-white rounded-xl shadow-md border-2 border-purple-100 p-5 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{habit.name}</h3>
          {habit.description && (
            <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            {habit.frequency === "daily" ? "Daily Habit" : habit.frequency}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          data-testid={`habit-edit-${slug}`}
          onClick={() => onEdit?.(habit)}
          className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-2 rounded-lg transition-all"
        >
          Edit
        </button>
        <button
          data-testid={`habit-delete-${slug}`}
          onClick={handleDeleteClick}
          className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 rounded-lg transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
