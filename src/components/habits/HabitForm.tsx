"use client";

import { useState, useEffect } from "react";
import { createHabit, updateHabit, getHabitById } from "@/lib/habits";
import { Habit } from "@/types/habit";

interface HabitFormProps {
  habitId?: string;
  onSuccess?: (habit: Habit) => void;
  onCancel?: () => void;
}

export default function HabitForm({
  habitId,
  onSuccess,
  onCancel,
}: HabitFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (habitId) {
      setIsEditing(true);
      const habit = getHabitById(habitId);
      if (habit) {
        setName(habit.name);
        setDescription(habit.description);
        setFrequency(habit.frequency);
      }
    }
  }, [habitId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result: Habit;

      if (isEditing && habitId) {
        result = updateHabit(habitId, {
          name,
          description,
          frequency,
        } as Partial<Habit>);
      } else {
        result = createHabit({
          name,
          description,
          frequency,
        });
      }

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save habit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="habit-name"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Habit Name
        </label>
        <input
          id="habit-name"
          type="text"
          data-testid="habit-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Morning Meditation"
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
          required
        />
      </div>

      <div>
        <label
          htmlFor="habit-description"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Description (Optional)
        </label>
        <textarea
          id="habit-description"
          data-testid="habit-description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Why is this habit important to you?"
          rows={3}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="habit-frequency"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Frequency
        </label>
        <select
          id="habit-frequency"
          data-testid="habit-frequency-select"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
        >
          <option value="daily">Daily</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          data-testid="habit-save-button"
          disabled={loading || !name.trim()}
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : isEditing ? "Update Habit" : "Create Habit"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border-2 border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
