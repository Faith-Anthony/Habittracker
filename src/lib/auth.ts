// Authentication utilities using Supabase

import { supabase } from "./supabase";

interface Session {
  userId: string;
  email: string;
  emailConfirmed?: boolean;
}

export async function isAuthenticated(): Promise<boolean> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session !== null;
}

export async function isEmailConfirmed(): Promise<boolean> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return false;

  // Check if email is confirmed
  return session.user.email_confirmed_at !== null;
}

export async function getCurrentUser(): Promise<Session | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  return {
    userId: session.user.id,
    email: session.user.email || "",
    emailConfirmed: session.user.email_confirmed_at !== null,
  };
}

export async function login(email: string, password: string): Promise<Session> {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.session) {
    throw new Error("Failed to create session");
  }

  return {
    userId: data.session.user.id,
    email: data.session.user.email || "",
  };
}

export async function signup(email: string, password: string, name?: string): Promise<Session> {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name || "",
      },
      emailRedirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/verify-email`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("Failed to create user");
  }

  return {
    userId: data.user.id,
    email: data.user.email || "",
    emailConfirmed: data.user.email_confirmed_at !== null,
  };
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

// Google OAuth Sign In
export async function signInWithGoogle(): Promise<{ url: string }> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/dashboard`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.url) {
    throw new Error("Failed to get Google sign-in URL");
  }

  return { url: data.url };
}

// Google OAuth Sign Up
export async function signUpWithGoogle(): Promise<{ url: string }> {
  return signInWithGoogle(); // Same flow for signup
}

// Apple OAuth Sign In
export async function signInWithApple(): Promise<{ url: string }> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "apple",
    options: {
      redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/dashboard`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.url) {
    throw new Error("Failed to get Apple sign-in URL");
  }

  return { url: data.url };
}

// Apple OAuth Sign Up
export async function signUpWithApple(): Promise<{ url: string }> {
  return signInWithApple(); // Same flow for signup
}

// Request password reset email
export async function requestPasswordReset(email: string): Promise<void> {
  if (!email) {
    throw new Error("Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }
}

// Reset password with token
export async function resetPassword(newPassword: string): Promise<void> {
  if (!newPassword || newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }
}
