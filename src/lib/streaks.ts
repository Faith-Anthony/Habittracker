// Phase 4: Streak calculation logic

import { getTodayString, getPreviousDay } from "./dates";

export function calculateCurrentStreak(
  completions: string[],
  today?: string
): number {
  const todayStr = today || getTodayString();

  // If no completions, streak is 0
  if (!completions || completions.length === 0) {
    return 0;
  }

  // Remove duplicates and sort in reverse chronological order
  const uniqueDates = Array.from(new Set(completions)).sort().reverse();

  // If today is not included, streak is 0
  if (!uniqueDates.includes(todayStr)) {
    return 0;
  }

  // Count consecutive days starting from today
  let streak = 0;
  let currentDate = todayStr;

  for (const date of uniqueDates) {
    if (date === currentDate) {
      streak++;
      currentDate = getPreviousDay(currentDate);
    } else {
      break;
    }
  }

  return streak;
}

export function getStreakStatus(streak: number): string {
  if (streak === 0) {
    return "No streak";
  } else if (streak === 1) {
    return "1 day";
  } else {
    return `${streak} days`;
  }
}
