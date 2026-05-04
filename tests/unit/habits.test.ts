import { 
  createHabit, 
  updateHabit, 
  deleteHabit, 
  getHabits, 
  saveHabits,
  getUserHabits,
  getHabitById,
  toggleHabitCompletion,
  isHabitCompletedToday
} from '@/lib/habits';
import * as storage from '@/lib/storage';
import * as auth from '@/lib/auth';
import { Habit } from '@/types/habit';

jest.mock('@/lib/storage');
jest.mock('@/lib/auth');

const mockStorage = storage as jest.Mocked<typeof storage>;
const mockAuth = auth as jest.Mocked<typeof auth>;

describe('habits.ts', () => {
  const mockUser = { userId: 'user-1', email: 'test@example.com' };
  const mockToday = '2024-01-10';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-10'));
    mockAuth.getCurrentUser.mockReturnValue(mockUser);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('createHabit', () => {
    it('should create habit with required fields', () => {
      mockStorage.getFromStorage.mockReturnValue([]);
      
      const habit = createHabit({
        name: 'Morning Meditation',
        description: 'Start the day mindfully',
        frequency: 'daily'
      });

      expect(habit.name).toBe('Morning Meditation');
      expect(habit.description).toBe('Start the day mindfully');
      expect(habit.frequency).toBe('daily');
      expect(habit.userId).toBe('user-1');
      expect(habit.completions).toEqual([]);
    });

    it('should trim habit name', () => {
      mockStorage.getFromStorage.mockReturnValue([]);
      
      const habit = createHabit({ name: '  Test Habit  ' });
      
      expect(habit.name).toBe('Test Habit');
    });

    it('should use default frequency if not provided', () => {
      mockStorage.getFromStorage.mockReturnValue([]);
      
      const habit = createHabit({ name: 'Test' });
      
      expect(habit.frequency).toBe('daily');
    });

    it('should throw error if user not authenticated', () => {
      mockAuth.getCurrentUser.mockReturnValue(null);
      
      expect(() => createHabit({ name: 'Test' })).toThrow('User not authenticated');
    });

    it('should throw error if name is empty', () => {
      expect(() => createHabit({ name: '' })).toThrow('Habit name is required');
    });

    it('should throw error if name is only whitespace', () => {
      expect(() => createHabit({ name: '   ' })).toThrow('Habit name is required');
    });

    it('should save to storage', () => {
      mockStorage.getFromStorage.mockReturnValue([]);
      
      createHabit({ name: 'Test' });
      
      expect(mockStorage.saveToStorage).toHaveBeenCalled();
    });
  });

  describe('updateHabit', () => {
    it('should update habit fields', () => {
      const existingHabit: Habit = {
        id: '1',
        userId: 'user-1',
        name: 'Old Name',
        description: 'Old description',
        frequency: 'daily',
        createdAt: '2024-01-01T00:00:00Z',
        completions: [],
      };
      
      mockStorage.getFromStorage.mockReturnValue([existingHabit]);
      
      const updated = updateHabit('1', { name: 'New Name' });
      
      expect(updated.name).toBe('New Name');
      expect(updated.id).toBe('1');
      expect(updated.userId).toBe('user-1');
    });

    it('should preserve completions array', () => {
      const existingHabit: Habit = {
        id: '1',
        userId: 'user-1',
        name: 'Test',
        description: '',
        frequency: 'daily',
        createdAt: '2024-01-01T00:00:00Z',
        completions: ['2024-01-08', '2024-01-09'],
      };
      
      mockStorage.getFromStorage.mockReturnValue([existingHabit]);
      
      const updated = updateHabit('1', { name: 'Updated' });
      
      expect(updated.completions).toEqual(['2024-01-08', '2024-01-09']);
    });

    it('should throw error if habit not found', () => {
      mockStorage.getFromStorage.mockReturnValue([]);
      
      expect(() => updateHabit('1', { name: 'New' })).toThrow('Habit not found');
    });
  });

  describe('deleteHabit', () => {
    it('should remove habit from storage', () => {
      const habit1: Habit = {
        id: '1',
        userId: 'user-1',
        name: 'Habit 1',
        description: '',
        frequency: 'daily',
        createdAt: '2024-01-01T00:00:00Z',
        completions: [],
      };
      
      const habit2: Habit = {
        id: '2',
        userId: 'user-1',
        name: 'Habit 2',
        description: '',
        frequency: 'daily',
        createdAt: '2024-01-01T00:00:00Z',
        completions: [],
      };
      
      mockStorage.getFromStorage.mockReturnValue([habit1, habit2]);
      
      deleteHabit('1');
      
      expect(mockStorage.saveToStorage).toHaveBeenCalledWith('habit-tracker-habits', [habit2]);
    });
  });

  describe('getHabitById', () => {
    it('should return habit by id', () => {
      const habit: Habit = {
        id: '1',
        userId: 'user-1',
        name: 'Test',
        description: '',
        frequency: 'daily',
        createdAt: '2024-01-01T00:00:00Z',
        completions: [],
      };
      
      mockStorage.getFromStorage.mockReturnValue([habit]);
      
      const found = getHabitById('1');
      
      expect(found).toEqual(habit);
    });

    it('should return null if habit not found', () => {
      mockStorage.getFromStorage.mockReturnValue([]);
      
      const found = getHabitById('1');
      
      expect(found).toBeNull();
    });
  });

  describe('getUserHabits', () => {
    it('should return habits for specific user', () => {
      const habit1: Habit = {
        id: '1',
        userId: 'user-1',
        name: 'Habit 1',
        description: '',
        frequency: 'daily',
        createdAt: '2024-01-01T00:00:00Z',
        completions: [],
      };
      
      const habit2: Habit = {
        id: '2',
        userId: 'user-2',
        name: 'Habit 2',
        description: '',
        frequency: 'daily',
        createdAt: '2024-01-01T00:00:00Z',
        completions: [],
      };
      
      mockStorage.getFromStorage.mockReturnValue([habit1, habit2]);
      
      const userHabits = getUserHabits('user-1');
      
      expect(userHabits).toEqual([habit1]);
    });
  });

  describe('toggleHabitCompletion', () => {
    it('should add date if not in completions', () => {
      const habit: Habit = {
        id: '1',
        userId: 'user-1',
        name: 'Test',
        description: '',
        frequency: 'daily',
        createdAt: '2024-01-01T00:00:00Z',
        completions: [],
      };
      
      const updated = toggleHabitCompletion(habit, '2024-01-10');
      
      expect(updated.completions).toEqual(['2024-01-10']);
    });

    it('should remove date if in completions', () => {
      const habit: Habit = {
        id: '1',
        userId: 'user-1',
        name: 'Test',
        description: '',
        frequency: 'daily',
        createdAt: '2024-01-01T00:00:00Z',
        completions: ['2024-01-10'],
      };
      
      const updated = toggleHabitCompletion(habit, '2024-01-10');
      
      expect(updated.completions).toEqual([]);
    });

    it('should not mutate original habit', () => {
      const habit: Habit = {
        id: '1',
        userId: 'user-1',
        name: 'Test',
        description: '',
        frequency: 'daily',
        createdAt: '2024-01-01T00:00:00Z',
        completions: [],
      };
      
      const updated = toggleHabitCompletion(habit, '2024-01-10');
      
      expect(habit.completions).toEqual([]);
      expect(updated.completions).toEqual(['2024-01-10']);
    });

    it('should remove duplicates', () => {
      const habit: Habit = {
        id: '1',
        userId: 'user-1',
        name: 'Test',
        description: '',
        frequency: 'daily',
        createdAt: '2024-01-01T00:00:00Z',
        completions: ['2024-01-10', '2024-01-10'],
      };
      
      const updated = toggleHabitCompletion(habit, '2024-01-09');
      
      expect(updated.completions).toHaveLength(2);
      expect(new Set(updated.completions).size).toBe(2);
    });
  });

  describe('isHabitCompletedToday', () => {
    it('should return true if today is in completions', () => {
      const habit: Habit = {
        id: '1',
        userId: 'user-1',
        name: 'Test',
        description: '',
        frequency: 'daily',
        createdAt: '2024-01-01T00:00:00Z',
        completions: ['2024-01-10'],
      };
      
      const completed = isHabitCompletedToday(habit);
      
      expect(completed).toBe(true);
    });

    it('should return false if today is not in completions', () => {
      const habit: Habit = {
        id: '1',
        userId: 'user-1',
        name: 'Test',
        description: '',
        frequency: 'daily',
        createdAt: '2024-01-01T00:00:00Z',
        completions: ['2024-01-09'],
      };
      
      const completed = isHabitCompletedToday(habit);
      
      expect(completed).toBe(false);
    });
  });
});
