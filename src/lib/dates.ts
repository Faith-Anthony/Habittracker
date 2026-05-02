// Phase 4: Date utilities in ISO format (YYYY-MM-DD)

export function getTodayString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseISODate(dateString: string): Date {
  return new Date(dateString + "T00:00:00Z");
}

export function isToday(dateString: string): boolean {
  return dateString === getTodayString();
}

export function getPreviousDay(dateString: string): string {
  const date = parseISODate(dateString);
  const prevDate = new Date(date);
  prevDate.setDate(prevDate.getDate() - 1);
  return getDateString(prevDate);
}

export function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return getDateString(date);
}
