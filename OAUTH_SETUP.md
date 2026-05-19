# OAuth Setup Guide: Google & Apple Sign-In

This guide explains how to enable Google and Apple OAuth authentication for HabitFlow on Supabase.

## Overview

Users can now sign up and login using:
- **Email + Password** (manual account)
- **Google OAuth** (one-click sign-up/login)
- **Apple OAuth** (one-click sign-up/login)

After signup via any method, users receive a **confirmation email** before gaining full app access.

---

## Step 1: Enable Google OAuth on Supabase

### 1.1 Create Google OAuth Credentials

1. Go to **Google Cloud Console**: https://console.cloud.google.com/
2. Create a new project:
   - Click "Select a Project" → "New Project"
   - Name: `HabitTracker`
   - Click "Create"

3. Enable Google+ API:
   - Left menu → "APIs & Services" → "Library"
   - Search: "Google+ API"
   - Click the Google+ API → "Enable"

4. Create OAuth 2.0 Credentials:
   - Left menu → "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add Authorized redirect URIs:
     ```
     https://tjpyperngoifzqcncxcc.supabase.co/auth/v1/callback
     ```
   - Click "Create"
   - Copy your **Client ID** and **Client Secret**

### 1.2 Add to Supabase

1. Go to: https://app.supabase.com → Select `habittracker` project
2. Left sidebar → **Authentication** → **Providers**
3. Find "Google" → Click to expand
4. Toggle "Enable"
5. Paste your **Client ID** and **Client Secret**
6. Click "Save"

---

## Step 2: Enable Apple OAuth on Supabase

### 2.1 Create Apple OAuth Credentials

1. Go to **Apple Developer Account**: https://developer.apple.com/
2. Sign in with your Apple ID (create one if needed)

3. Create an App ID:
   - Certificates, IDs & Profiles → Identifiers
   - Click "+" → Select "App IDs"
   - Register an App ID:
     - App Type: App
     - Description: `HabitTracker Web`
     - Bundle ID: `com.habittracker.web`
     - Check "Sign in with Apple"
   - Click "Continue" → "Register"

4. Create a Services ID (for web):
   - Identifiers → "+" → "Services IDs"
   - Description: `HabitTracker Web Service`
   - Bundle ID: `com.habittracker.web.service`
   - Check "Sign in with Apple"
   - Click "Continue" → "Register"

5. Configure Service ID:
   - Click your new Services ID
   - Check "Sign in with Apple"
   - Click "Configure"
   - Add domain:
     ```
     tjpyperngoifzqcncxcc.supabase.co
     ```
   - Return URL:
     ```
     https://tjpyperngoifzqcncxcc.supabase.co/auth/v1/callback
     ```
   - Click "Next" → "Done" → "Save"

6. Create a private key:
   - Keys → "+"
   - Key Name: `HabitTracker Auth`
   - Check "Sign in with Apple"
   - Click "Configure" → Select your App ID
   - Click "Save"
   - Download the `.p8` file (save carefully!)
   - Note your:
     - **Team ID** (top right of Apple Developer portal)
     - **Key ID** (shown when you created the key)
     - **Client ID**: Your Services ID (e.g., `com.habittracker.web.service`)

### 2.2 Add to Supabase

1. Go to: https://app.supabase.com → Select `habittracker` project
2. Left sidebar → **Authentication** → **Providers**
3. Find "Apple" → Click to expand
4. Toggle "Enable"
5. Fill in:
   - **Client ID**: Your Services ID
   - **Team ID**: Your Apple Developer Team ID
   - **Key ID**: The key you created
   - **Certificate**: Open the `.p8` file with text editor, copy entire content
6. Click "Save"

---

## Step 3: Test OAuth Flow Locally

### 3.1 Test Google OAuth

1. Run dev server:
   ```bash
   npm run dev
   ```

2. Go to: `http://localhost:3000/auth/signup`

3. Click **Google** button

4. You'll be redirected to Google login

5. After login, you should be redirected to verify-email page

6. After confirming email, redirected to dashboard ✅

### 3.2 Test Apple OAuth

Same as Google (click **Apple** button on signup/login page)

---

## Step 4: Email Verification Flow

### What Happens:

1. **User clicks Google/Apple** → Redirects to provider login
2. **After OAuth success** → Supabase automatically creates account
3. **User sees "Check Email"** page (verify-email)
4. **Supabase sends confirmation email** automatically
5. **User clicks confirmation link** in email
6. **Email verified** → User has full dashboard access ✅

### Manual Account Flow:

1. **User enters email + password** → Clicks "Create Account"
2. **Account created (unconfirmed)**
3. **User sees "Check Email"** page
4. **Supabase + Resend send emails**:
   - Supabase: Confirmation email (required)
   - Resend: Welcome email (optional, free tier)
5. **User confirms email** → Full access ✅

---

## Troubleshooting

### Google OAuth Not Working
- ✅ Check Google Cloud credentials are correct (Client ID + Secret)
- ✅ Verify redirect URI in Google Console matches exactly
- ✅ Enable Google+ API in Google Cloud Console

### Apple OAuth Not Working
- ✅ Ensure Services ID is configured correctly
- ✅ Check `.p8` certificate hasn't expired
- ✅ Verify Team ID and Key ID are correct
- ✅ Confirm return URL domain matches your Supabase project

### Email Confirmation Not Received
- ✅ Check spam/junk folder
- ✅ Wait 2-5 minutes (Supabase takes time)
- ✅ Try signing up with different email
- ✅ Check Supabase "Auth Logs" for errors: https://app.supabase.com → Authentication → Auth Logs

### User Can't Access Dashboard After Email Confirmed
- ✅ Hard refresh page (Ctrl+F5)
- ✅ Clear browser cookies
- ✅ Try logging in again

---

## Current Implementation

### Files Updated:
- `src/lib/auth.ts` - Added `signInWithGoogle()`, `signUpWithGoogle()`, `signInWithApple()`, `signUpWithApple()`, email verification check
- `src/components/auth/SignupForm.tsx` - Added Google + Apple buttons with OAuth handlers
- `src/components/auth/LoginForm.tsx` - Added Google + Apple buttons with OAuth handlers, fixed forgot password link
- `src/app/auth/verify-email/page.tsx` - Email verification confirmation page
- `src/app/auth/forgot-password/page.tsx` - Password reset request page
- `src/app/auth/reset-password/page.tsx` - Set new password page

### Environment Variables:
No additional env vars needed for Google/Apple OAuth. Credentials are managed entirely in Supabase dashboard.

---

## What's Next?

After users verify their email, they have full access to:
- Dashboard with all their habits
- Create/edit/delete habits
- Track daily completions
- View habit streaks
- Real-time database sync

Email notifications via Resend (optional):
- Welcome email on signup
- Habit completion reminders (future)
- Streak milestone achievements (future)

---

## References

- [Supabase OAuth Documentation](https://supabase.com/docs/guides/auth/social-login)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Apple Developer](https://developer.apple.com/)
- [Resend Email Service](https://resend.com/)
