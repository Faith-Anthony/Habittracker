import { validateEmail, validatePassword, validateHabitName, getErrorMessage } from '@/lib/validators';

describe('validators.ts', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('user@example.com')).toBe(true);
    });

    it('should validate email with numbers', () => {
      expect(validateEmail('user123@example.com')).toBe(true);
    });

    it('should validate email with dots', () => {
      expect(validateEmail('user.name@example.co.uk')).toBe(true);
    });

    it('should reject email without @', () => {
      expect(validateEmail('userexample.com')).toBe(false);
    });

    it('should reject email without domain', () => {
      expect(validateEmail('user@')).toBe(false);
    });

    it('should reject email without local part', () => {
      expect(validateEmail('@example.com')).toBe(false);
    });

    it('should reject email with spaces', () => {
      expect(validateEmail('user @example.com')).toBe(false);
    });

    it('should reject empty email', () => {
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate password with 8 characters', () => {
      expect(validatePassword('password')).toBe(true);
    });

    it('should validate password longer than 8 characters', () => {
      expect(validatePassword('longpassword123')).toBe(true);
    });

    it('should reject password shorter than 8 characters', () => {
      expect(validatePassword('pass123')).toBe(false);
    });

    it('should reject empty password', () => {
      expect(validatePassword('')).toBe(false);
    });

    it('should reject password with exactly 7 characters', () => {
      expect(validatePassword('passwor')).toBe(false);
    });
  });

  describe('validateHabitName', () => {
    it('should validate non-empty habit name', () => {
      expect(validateHabitName('Morning Meditation')).toBe(true);
    });

    it('should validate single character', () => {
      expect(validateHabitName('A')).toBe(true);
    });

    it('should validate habit name with 100 characters', () => {
      const name100 = 'a'.repeat(100);
      expect(validateHabitName(name100)).toBe(true);
    });

    it('should reject empty habit name', () => {
      expect(validateHabitName('')).toBe(false);
    });

    it('should reject habit name with only spaces', () => {
      expect(validateHabitName('   ')).toBe(false);
    });

    it('should reject habit name longer than 100 characters', () => {
      const name101 = 'a'.repeat(101);
      expect(validateHabitName(name101)).toBe(false);
    });
  });

  describe('getErrorMessage', () => {
    it('should return error message', () => {
      expect(getErrorMessage('Invalid input')).toBe('Invalid input');
    });

    it('should handle empty error message', () => {
      expect(getErrorMessage('')).toBe('');
    });
  });
});
