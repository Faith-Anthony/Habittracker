import { calculateCurrentStreak, getStreakStatus } from '@/lib/streaks';

describe('streaks.ts', () => {
  describe('calculateCurrentStreak', () => {
    it('should return 0 for empty completions', () => {
      expect(calculateCurrentStreak([], '2024-01-10')).toBe(0);
    });

    it('should return 0 if today is not in completions', () => {
      expect(calculateCurrentStreak(['2024-01-08', '2024-01-09'], '2024-01-10')).toBe(0);
    });

    it('should return 1 if only today is completed', () => {
      expect(calculateCurrentStreak(['2024-01-10'], '2024-01-10')).toBe(1);
    });

    it('should return 2 for consecutive days ending today', () => {
      expect(calculateCurrentStreak(['2024-01-09', '2024-01-10'], '2024-01-10')).toBe(2);
    });

    it('should return 3 for three consecutive days ending today', () => {
      expect(calculateCurrentStreak(['2024-01-08', '2024-01-09', '2024-01-10'], '2024-01-10')).toBe(3);
    });

    it('should count consecutive days in reverse order', () => {
      expect(calculateCurrentStreak(['2024-01-10', '2024-01-09', '2024-01-08'], '2024-01-10')).toBe(3);
    });

    it('should handle duplicate dates', () => {
      expect(calculateCurrentStreak(['2024-01-10', '2024-01-10', '2024-01-09'], '2024-01-10')).toBe(2);
    });

    it('should break streak if date is missing', () => {
      expect(calculateCurrentStreak(['2024-01-10', '2024-01-08'], '2024-01-10')).toBe(1);
    });

    it('should use today as default date', () => {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      expect(calculateCurrentStreak([today, yesterday])).toBe(2);
    });

    it('should handle dates not in order', () => {
      expect(calculateCurrentStreak(['2024-01-08', '2024-01-10', '2024-01-09'], '2024-01-10')).toBe(3);
    });
  });

  describe('getStreakStatus', () => {
    it('should return "No streak" for 0', () => {
      expect(getStreakStatus(0)).toBe('No streak');
    });

    it('should return "1 day" for 1', () => {
      expect(getStreakStatus(1)).toBe('1 day');
    });

    it('should return "2 days" for 2', () => {
      expect(getStreakStatus(2)).toBe('2 days');
    });

    it('should return "10 days" for 10', () => {
      expect(getStreakStatus(10)).toBe('10 days');
    });

    it('should return "365 days" for 365', () => {
      expect(getStreakStatus(365)).toBe('365 days');
    });
  });
});
