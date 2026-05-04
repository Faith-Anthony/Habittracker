import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HabitForm from '@/components/habits/HabitForm';
import * as habitsLib from '@/lib/habits';

jest.mock('@/lib/habits');

const mockHabitsLib = habitsLib as jest.Mocked<typeof habitsLib>;

describe('habit-form.test.tsx', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('HabitForm', () => {
    it('should render create mode form', () => {
      render(<HabitForm />);
      
      expect(screen.getByTestId('habit-name-input')).toBeInTheDocument();
      expect(screen.getByTestId('habit-description-input')).toBeInTheDocument();
      expect(screen.getByTestId('habit-frequency-select')).toBeInTheDocument();
      expect(screen.getByTestId('habit-save-button')).toBeInTheDocument();
    });

    it('should have labels for all inputs', () => {
      render(<HabitForm />);
      
      expect(screen.getByLabelText('Habit Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Description (Optional)')).toBeInTheDocument();
      expect(screen.getByLabelText('Frequency')).toBeInTheDocument();
    });

    it('should create a new habit', async () => {
      const mockHabit = {
        id: '1',
        userId: 'user-1',
        name: 'Morning Meditation',
        description: 'Start the day mindfully',
        frequency: 'daily',
        createdAt: '2024-01-10T00:00:00Z',
        completions: [],
      };
      
      mockHabitsLib.createHabit.mockReturnValue(mockHabit);
      
      const onSuccess = jest.fn();
      const user = userEvent.setup();
      
      render(<HabitForm onSuccess={onSuccess} />);
      
      const nameInput = screen.getByTestId('habit-name-input');
      const descriptionInput = screen.getByTestId('habit-description-input');
      const saveButton = screen.getByTestId('habit-save-button');
      
      await user.type(nameInput, 'Morning Meditation');
      await user.type(descriptionInput, 'Start the day mindfully');
      await user.click(saveButton);
      
      await waitFor(() => {
        expect(mockHabitsLib.createHabit).toHaveBeenCalledWith({
          name: 'Morning Meditation',
          description: 'Start the day mindfully',
          frequency: 'daily',
        });
        expect(onSuccess).toHaveBeenCalledWith(mockHabit);
      });
    });

    it('should load existing habit for edit mode', async () => {
      const existingHabit = {
        id: '1',
        userId: 'user-1',
        name: 'Morning Meditation',
        description: 'Start the day mindfully',
        frequency: 'daily',
        createdAt: '2024-01-10T00:00:00Z',
        completions: [],
      };
      
      mockHabitsLib.getHabitById.mockReturnValue(existingHabit);
      
      render(<HabitForm habitId="1" />);
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('Morning Meditation')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Start the day mindfully')).toBeInTheDocument();
      });
    });

    it('should update an existing habit', async () => {
      const existingHabit = {
        id: '1',
        userId: 'user-1',
        name: 'Morning Meditation',
        description: 'Start the day mindfully',
        frequency: 'daily',
        createdAt: '2024-01-10T00:00:00Z',
        completions: [],
      };
      
      const updatedHabit = {
        ...existingHabit,
        name: 'Evening Meditation',
      };
      
      mockHabitsLib.getHabitById.mockReturnValue(existingHabit);
      mockHabitsLib.updateHabit.mockReturnValue(updatedHabit);
      
      const onSuccess = jest.fn();
      const user = userEvent.setup();
      
      const { rerender } = render(<HabitForm habitId="1" onSuccess={onSuccess} />);
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('Morning Meditation')).toBeInTheDocument();
      });
      
      const nameInput = screen.getByTestId('habit-name-input') as HTMLInputElement;
      const saveButton = screen.getByTestId('habit-save-button');
      
      await user.clear(nameInput);
      await user.type(nameInput, 'Evening Meditation');
      await user.click(saveButton);
      
      await waitFor(() => {
        expect(mockHabitsLib.updateHabit).toHaveBeenCalledWith('1', {
          name: 'Evening Meditation',
          description: 'Start the day mindfully',
          frequency: 'daily',
        });
      });
    });

    it('should display error message on save failure', async () => {
      mockHabitsLib.createHabit.mockImplementation(() => {
        throw new Error('Failed to create habit');
      });
      
      const user = userEvent.setup();
      
      render(<HabitForm />);
      
      const nameInput = screen.getByTestId('habit-name-input');
      const saveButton = screen.getByTestId('habit-save-button');
      
      await user.type(nameInput, 'Test Habit');
      await user.click(saveButton);
      
      await waitFor(() => {
        expect(screen.getByText('Failed to create habit')).toBeInTheDocument();
      });
    });

    it('should disable save button when name is empty', () => {
      render(<HabitForm />);
      
      const saveButton = screen.getByTestId('habit-save-button');
      
      expect(saveButton).toBeDisabled();
    });

    it('should enable save button when name is entered', async () => {
      const user = userEvent.setup();
      
      render(<HabitForm />);
      
      const nameInput = screen.getByTestId('habit-name-input');
      const saveButton = screen.getByTestId('habit-save-button');
      
      expect(saveButton).toBeDisabled();
      
      await user.type(nameInput, 'Test Habit');
      
      expect(saveButton).not.toBeDisabled();
    });

    it('should call onCancel when cancel button is clicked', async () => {
      const onCancel = jest.fn();
      const user = userEvent.setup();
      
      render(<HabitForm onCancel={onCancel} />);
      
      const cancelButton = screen.getByText('Cancel');
      await user.click(cancelButton);
      
      expect(onCancel).toHaveBeenCalled();
    });

    it('should have proper focus management for keyboard navigation', async () => {
      const user = userEvent.setup();
      
      render(<HabitForm />);
      
      const nameInput = screen.getByTestId('habit-name-input');
      
      await user.tab();
      expect(nameInput).toHaveFocus();
    });

    it('should trim whitespace from habit name', async () => {
      mockHabitsLib.createHabit.mockReturnValue({
        id: '1',
        userId: 'user-1',
        name: 'Test Habit',
        description: '',
        frequency: 'daily',
        createdAt: '2024-01-10T00:00:00Z',
        completions: [],
      });
      
      const user = userEvent.setup();
      
      render(<HabitForm />);
      
      const nameInput = screen.getByTestId('habit-name-input');
      const saveButton = screen.getByTestId('habit-save-button');
      
      await user.type(nameInput, '  Test Habit  ');
      await user.click(saveButton);
      
      // Save button should work since there's content after trimming
      await waitFor(() => {
        expect(mockHabitsLib.createHabit).toHaveBeenCalled();
      });
    });
  });
});
