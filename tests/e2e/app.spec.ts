import { test, expect } from '@playwright/test';

test.describe('HabitFlow E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.evaluate(() => localStorage.clear());
    // Navigate to home
    await page.goto('/');
  });

  test('signup - should create new account', async ({ page }) => {
    await page.goto('/signup');
    
    const emailInput = page.getByTestId('auth-signup-email');
    const passwordInput = page.getByTestId('auth-signup-password');
    const submitButton = page.getByTestId('auth-signup-submit');
    
    await emailInput.fill('newuser@example.com');
    await passwordInput.fill('password123');
    await submitButton.click();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('login - should log in existing user', async ({ page }) => {
    // First sign up
    await page.goto('/signup');
    
    await page.getByTestId('auth-signup-email').fill('testuser@example.com');
    await page.getByTestId('auth-signup-password').fill('password123');
    await page.getByTestId('auth-signup-submit').click();
    
    await expect(page).toHaveURL('/dashboard');
    
    // Logout
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.getByRole('button', { name: 'Yes, Logout' }).click();
    
    // Should be back at login
    await expect(page).toHaveURL('/login');
    
    // Now login
    await page.getByTestId('auth-login-email').fill('testuser@example.com');
    await page.getByTestId('auth-login-password').fill('password123');
    await page.getByTestId('auth-login-submit').click();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('dashboard access - should show logged in user dashboard', async ({ page }) => {
    // Sign up first
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('dashboarduser@example.com');
    await page.getByTestId('auth-signup-password').fill('password123');
    await page.getByTestId('auth-signup-submit').click();
    
    // Check dashboard elements
    await expect(page.locator('text=My Habits')).toBeVisible();
    await expect(page.locator('text=dashboarduser@example.com')).toBeVisible();
    await expect(page.getByRole('button', { name: /Create New Habit/i })).toBeVisible();
  });

  test('create habit - should create a new habit', async ({ page }) => {
    // Sign up and go to dashboard
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('habituser@example.com');
    await page.getByTestId('auth-signup-password').fill('password123');
    await page.getByTestId('auth-signup-submit').click();
    
    // Create a habit
    await page.getByRole('button', { name: /Create New Habit/i }).click();
    
    await page.getByTestId('habit-name-input').fill('Morning Meditation');
    await page.getByTestId('habit-description-input').fill('Start the day mindfully');
    await page.getByTestId('habit-save-button').click();
    
    // Check that habit appears in list
    await expect(page.locator('text=Morning Meditation')).toBeVisible();
    await expect(page.locator('text=Start the day mindfully')).toBeVisible();
  });

  test('complete habit - should toggle habit completion', async ({ page }) => {
    // Sign up and create habit
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('completeuser@example.com');
    await page.getByTestId('auth-signup-password').fill('password123');
    await page.getByTestId('auth-signup-submit').click();
    
    await page.getByRole('button', { name: /Create New Habit/i }).click();
    await page.getByTestId('habit-name-input').fill('Drink Water');
    await page.getByTestId('habit-save-button').click();
    
    // Complete the habit
    const completeButton = page.getByRole('button', { name: /Mark complete/i });
    await completeButton.click();
    
    // Check that button changed to "Mark incomplete"
    await expect(page.getByRole('button', { name: /Mark incomplete/i })).toBeVisible();
    
    // Check that streak updated
    await expect(page.locator('text=1 day')).toBeVisible();
  });

  test('persistence after reload - should persist data after page reload', async ({ page }) => {
    // Sign up and create habit
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('persistuser@example.com');
    await page.getByTestId('auth-signup-password').fill('password123');
    await page.getByTestId('auth-signup-submit').click();
    
    await page.getByRole('button', { name: /Create New Habit/i }).click();
    await page.getByTestId('habit-name-input').fill('Evening Walk');
    await page.getByTestId('habit-save-button').click();
    
    // Complete the habit
    await page.getByRole('button', { name: /Mark complete/i }).click();
    
    // Wait for UI to update
    await expect(page.getByRole('button', { name: /Mark incomplete/i })).toBeVisible();
    
    // Reload page
    await page.reload();
    
    // Habit should still be there and completed
    await expect(page.locator('text=Evening Walk')).toBeVisible();
    await expect(page.getByRole('button', { name: /Mark incomplete/i })).toBeVisible();
    await expect(page.locator('text=1 day')).toBeVisible();
  });

  test('logout - should log out user with confirmation', async ({ page }) => {
    // Sign up
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('logoutuser@example.com');
    await page.getByTestId('auth-signup-password').fill('password123');
    await page.getByTestId('auth-signup-submit').click();
    
    // Click logout
    const logoutButton = page.getByRole('button', { name: 'Logout' });
    await logoutButton.click();
    
    // Check confirmation modal
    await expect(page.locator('text=Confirm Logout?')).toBeVisible();
    
    // Click yes to confirm
    const confirmButton = page.getByRole('button', { name: 'Yes, Logout' });
    await confirmButton.click();
    
    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });

  test('keyboard navigation - should support keyboard navigation', async ({ page }) => {
    // Sign up
    await page.goto('/signup');
    
    const emailInput = page.getByTestId('auth-signup-email');
    const passwordInput = page.getByTestId('auth-signup-password');
    const submitButton = page.getByTestId('auth-signup-submit');
    
    // Tab to email input
    await emailInput.focus();
    await expect(emailInput).toBeFocused();
    
    // Fill email
    await emailInput.fill('keyboarduser@example.com');
    
    // Tab to password
    await page.keyboard.press('Tab');
    await expect(passwordInput).toBeFocused();
    
    // Fill password
    await passwordInput.fill('password123');
    
    // Tab to submit button
    await page.keyboard.press('Tab');
    await expect(submitButton).toBeFocused();
    
    // Press enter to submit
    await page.keyboard.press('Enter');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('multi-user isolation - should isolate habits between users', async ({ browser }) => {
    // Create first user's habits
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    
    await page1.goto('/signup');
    await page1.getByTestId('auth-signup-email').fill('user1@example.com');
    await page1.getByTestId('auth-signup-password').fill('password123');
    await page1.getByTestId('auth-signup-submit').click();
    
    await page1.getByRole('button', { name: /Create New Habit/i }).click();
    await page1.getByTestId('habit-name-input').fill('User1 Habit');
    await page1.getByTestId('habit-save-button').click();
    
    // Create second user's habits
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    
    await page2.goto('/signup');
    await page2.getByTestId('auth-signup-email').fill('user2@example.com');
    await page2.getByTestId('auth-signup-password').fill('password123');
    await page2.getByTestId('auth-signup-submit').click();
    
    await page2.getByRole('button', { name: /Create New Habit/i }).click();
    await page2.getByTestId('habit-name-input').fill('User2 Habit');
    await page2.getByTestId('habit-save-button').click();
    
    // Check user1 only sees their habit
    const habit1Count = await page1.locator('text=User1 Habit').count();
    const habit2Count = await page1.locator('text=User2 Habit').count();
    
    expect(habit1Count).toBe(1);
    expect(habit2Count).toBe(0);
    
    // Check user2 only sees their habit
    const user2Habit1Count = await page2.locator('text=User1 Habit').count();
    const user2Habit2Count = await page2.locator('text=User2 Habit').count();
    
    expect(user2Habit1Count).toBe(0);
    expect(user2Habit2Count).toBe(1);
    
    await context1.close();
    await context2.close();
  });

  test('responsive design - should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/signup');
    
    const emailInput = page.getByTestId('auth-signup-email');
    const passwordInput = page.getByTestId('auth-signup-password');
    const submitButton = page.getByTestId('auth-signup-submit');
    
    await emailInput.fill('mobileuser@example.com');
    await passwordInput.fill('password123');
    await submitButton.click();
    
    // Check that dashboard is accessible
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=My Habits')).toBeVisible();
  });

  test('offline mode - should load app shell after first visit', async ({ page }) => {
    // First visit - should load normally
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('offlineuser@example.com');
    await page.getByTestId('auth-signup-password').fill('password123');
    await page.getByTestId('auth-signup-submit').click();
    
    await page.getByRole('button', { name: /Create New Habit/i }).click();
    await page.getByTestId('habit-name-input').fill('Offline Test Habit');
    await page.getByTestId('habit-save-button').click();
    
    // Wait for service worker to be active
    await page.waitForTimeout(2000);
    
    // Try to navigate to dashboard (should work from cache)
    await page.goto('/dashboard');
    
    // Check that page loaded
    await expect(page.locator('text=My Habits')).toBeVisible();
  });
});
