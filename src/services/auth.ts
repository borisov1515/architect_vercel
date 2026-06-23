const AUTH_KEY = 'ia-auth-session-v1';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'architect2026';

const REMEMBER_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const SESSION_MS = 12 * 60 * 60 * 1000; // 12 hours without "remember"

export interface AuthSession {
  username: string;
  loggedInAt: number;
  expiresAt: number;
  remember: boolean;
}

function storage(remember: boolean): Storage {
  return remember ? localStorage : sessionStorage;
}

function readSession(): AuthSession | null {
  const raw =
    localStorage.getItem(AUTH_KEY) ??
    sessionStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    const session = JSON.parse(raw) as AuthSession;
    if (session.expiresAt < Date.now()) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    clearSession();
    return null;
  }
}

export function isAuthenticated(): boolean {
  return readSession() !== null;
}

export function getSession(): AuthSession | null {
  return readSession();
}

export function login(username: string, password: string, remember: boolean): boolean {
  const user = username.trim().toLowerCase();
  if (user !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return false;
  }
  const now = Date.now();
  const session: AuthSession = {
    username: ADMIN_USERNAME,
    loggedInAt: now,
    expiresAt: now + (remember ? REMEMBER_MS : SESSION_MS),
    remember,
  };
  clearSession();
  storage(remember).setItem(AUTH_KEY, JSON.stringify(session));
  return true;
}

export function clearSession() {
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_KEY);
}

export function logout() {
  clearSession();
}

export function refreshSession() {
  const session = readSession();
  if (!session) return;
  const now = Date.now();
  session.expiresAt = now + (session.remember ? REMEMBER_MS : SESSION_MS);
  storage(session.remember).setItem(AUTH_KEY, JSON.stringify(session));
}
