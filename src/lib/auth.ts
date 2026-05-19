// Authentication utilities using Supabase

import { supabase } from "./supabase";

interface Session {
  userId: string;
  email: string;
}

export async function isAuthenticated(): Promise<boolean> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session !== null;
}

export async function getCurrentUser(): Promise<Session | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  return {
    userId: session.user.id,
    email: session.user.email || "",
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
  };
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
