import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/components/auth/LoginForm';
import { login } from '@/lib/auth';

jest.mock('@/lib/auth');
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockLogin = login as jest.MockedFunction<typeof login>;

describe('auth-flow.test.tsx', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LoginForm', () => {
    it('should render login form', () => {
      render(<LoginForm />);
      
      expect(screen.getByTestId('auth-login-email')).toBeInTheDocument();
      expect(screen.getByTestId('auth-login-password')).toBeInTheDocument();
      expect(screen.getByTestId('auth-login-submit')).toBeInTheDocument();
    });

    it('should have labels for all inputs', () => {
      render(<LoginForm />);
      
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('should submit form with email and password', async () => {
      mockLogin.mockResolvedValue({ userId: 'user-1', email: 'test@example.com' });
      
      const user = userEvent.setup();
      render(<LoginForm />);
      
      const emailInput = screen.getByTestId('auth-login-email');
      const passwordInput = screen.getByTestId('auth-login-password');
      const submitButton = screen.getByTestId('auth-login-submit');
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });

    it('should display error message on failed login', async () => {
      mockLogin.mockRejectedValue(new Error('Invalid credentials'));
      
      const user = userEvent.setup();
      render(<LoginForm />);
      
      const emailInput = screen.getByTestId('auth-login-email');
      const passwordInput = screen.getByTestId('auth-login-password');
      const submitButton = screen.getByTestId('auth-login-submit');
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });
    });

    it('should disable submit button while loading', async () => {
      mockLogin.mockImplementation(() => new Promise(() => {}));
      
      const user = userEvent.setup();
      render(<LoginForm />);
      
      const submitButton = screen.getByTestId('auth-login-submit');
      
      const emailInput = screen.getByTestId('auth-login-email');
      const passwordInput = screen.getByTestId('auth-login-password');
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);
      
      expect(submitButton).toBeDisabled();
    });

    it('should have keyboard navigation support', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);
      
      const emailInput = screen.getByTestId('auth-login-email');
      
      // Tab to email input
      await user.tab();
      expect(emailInput).toHaveFocus();
    });
  });
});
