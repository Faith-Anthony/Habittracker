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
          className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
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
          className="w-full px-4 py-2 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-base"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label
          htmlFor="habit-description"
          className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
        >
          Description <span className="text-slate-400 dark:text-slate-600 text-sm">(Optional)</span>
        </label>
        <textarea
          id="habit-description"
          data-testid="habit-description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Why is this habit important to you?"
          rows={3}
          className="w-full px-4 py-2 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-base resize-none"
        />
      </div>

      <div>
        <label
          htmlFor="habit-frequency"
          className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
        >
          Frequency
        </label>
        <select
          id="habit-frequency"
          data-testid="habit-frequency-select"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full px-4 py-2 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-base"
        >
          <option value="daily">Daily</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          data-testid="habit-save-button"
          disabled={loading || !name.trim()}
          className="flex-1 bg-violet-600 hover:bg-violet-700 focus:bg-violet-700 active:bg-violet-800 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base"
        >
          {loading ? "Saving..." : isEditing ? "Update Habit" : "Create Habit"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold py-2.5 sm:py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 focus:bg-slate-50 dark:focus:bg-slate-800 transition-all text-base"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
