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
      const loadHabit = async () => {
        try {
          const habit = await getHabitById(habitId);
          if (habit) {
            setName(habit.name);
            setDescription(habit.description);
            setFrequency(habit.frequency);
          }
        } catch (error) {
          console.error("Error loading habit:", error);
        }
      };
      loadHabit();
    }
  }, [habitId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result: Habit;

      if (isEditing && habitId) {
        result = await updateHabit(habitId, {
          name,
          description,
          frequency,
        } as Partial<Habit>);
      } else {
        result = await createHabit({
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
    <form data-testid="habit-form" onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm" role="alert">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="habit-name"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Habit Name <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          id="habit-name"
          type="text"
          data-testid="habit-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Morning Meditation"
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-base"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label
          htmlFor="habit-description"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Description <span className="text-gray-400 text-sm">(Optional)</span>
        </label>
        <textarea
          id="habit-description"
          data-testid="habit-description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Why is this habit important to you?"
          rows={3}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-base resize-none"
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
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-base bg-white"
        >
          <option value="daily">Daily</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          data-testid="habit-save-button"
          disabled={loading || !name.trim()}
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:from-purple-700 focus:to-purple-800 active:from-purple-800 active:to-purple-900 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base"
        >
          {loading ? "Saving..." : isEditing ? "Update Habit" : "Create Habit"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border-2 border-gray-300 text-gray-600 font-semibold py-2.5 sm:py-3 rounded-lg hover:bg-gray-50 focus:bg-gray-50 active:bg-gray-100 transition-all text-base"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
