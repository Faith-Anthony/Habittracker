// Phase 2: Authentication utilities with localStorage

import { saveToStorage, getFromStorage, removeFromStorage } from "./storage";

const USERS_KEY = "habit-tracker-users";
const SESSION_KEY = "habit-tracker-session";

interface User {
  id: string;
  email: string;
  password: string;
  createdAt: string;
}

interface Session {
  userId: string;
  email: string;
}

export function isAuthenticated(): boolean {
  const session = getFromStorage(SESSION_KEY);
  return session !== null;
}

export function getCurrentUser(): Session | null {
  return getFromStorage(SESSION_KEY);
}

export async function login(email: string, password: string): Promise<Session> {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const users = getFromStorage(USERS_KEY) || [];
  const user = users.find((u: User) => u.email === email);

  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }

  const session: Session = {
    userId: user.id,
    email: user.email,
  };

  saveToStorage(SESSION_KEY, session);
  return session;
}

export async function signup(email: string, password: string, name?: string): Promise<Session> {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const users = getFromStorage(USERS_KEY) || [];

  if (users.some((u: User) => u.email === email)) {
    throw new Error("User already exists");
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveToStorage(USERS_KEY, users);

  const session: Session = {
    userId: newUser.id,
    email: newUser.email,
  };

  saveToStorage(SESSION_KEY, session);
  return session;
}

export function logout(): void {
  removeFromStorage(SESSION_KEY);
}
