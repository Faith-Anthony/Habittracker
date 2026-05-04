import { createSlug, getHabitSlug, parseSlug } from '@/lib/slug';

describe('slug.ts', () => {
  describe('createSlug', () => {
    it('should convert to lowercase', () => {
      expect(createSlug('Morning Meditation')).toBe('morning-meditation');
    });

    it('should replace spaces with hyphens', () => {
      expect(createSlug('drink water')).toBe('drink-water');
    });

    it('should remove special characters', () => {
      expect(createSlug('Test Habit!')).toBe('test-habit');
    });

    it('should remove multiple consecutive hyphens', () => {
      expect(createSlug('Test---Habit')).toBe('test-habit');
    });

    it('should trim whitespace', () => {
      expect(createSlug('  test habit  ')).toBe('test-habit');
    });

    it('should handle empty string', () => {
      expect(createSlug('')).toBe('');
    });

    it('should handle string with only special characters', () => {
      expect(createSlug('!!!')).toBe('');
    });

    it('should handle complex names', () => {
      expect(createSlug('Read a Book @Home')).toBe('read-a-book-home');
    });
  });

  describe('getHabitSlug', () => {
    it('should create slug from habit name', () => {
      expect(getHabitSlug('Morning Meditation')).toBe('morning-meditation');
    });

    it('should handle special characters in habit name', () => {
      expect(getHabitSlug("Drink Water's Time")).toBe('drink-waters-time');
    });
  });

  describe('parseSlug', () => {
    it('should convert hyphens back to spaces', () => {
      expect(parseSlug('morning-meditation')).toBe('morning meditation');
    });

    it('should handle single word', () => {
      expect(parseSlug('meditation')).toBe('meditation');
    });

    it('should handle multiple hyphens', () => {
      expect(parseSlug('read-a-book')).toBe('read a book');
    });

    it('should handle empty string', () => {
      expect(parseSlug('')).toBe('');
    });
  });
});
