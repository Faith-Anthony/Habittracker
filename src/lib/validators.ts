// Phase 2: Form validators
// Will implement validation logic in future phases

export function validateEmail(email: string): boolean {
  // Phase 2: Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  // Phase 2: Password validation
  return password.length >= 8;
}

export function validateHabitName(name: string): boolean {
  // Phase 2: Habit name validation
  return name.trim().length > 0 && name.length <= 100;
}

export function getErrorMessage(error: string): string {
  // Phase 2: Generate user-friendly error messages
  return error;
}
