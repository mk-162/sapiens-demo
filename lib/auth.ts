import { createHash, timingSafeEqual } from 'node:crypto';

export const DEMO_AUTH_COOKIE = 'demo-auth';
export const DEMO_AUTH_MAX_AGE = 60 * 60 * 24 * 7;

function hash(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

export function getExpectedToken(): string | null {
  const password = process.env.DEMO_PASSWORD;
  if (!password) return null;
  return hash(password);
}

export function passwordIsCorrect(candidate: string): boolean {
  const password = process.env.DEMO_PASSWORD;
  if (!password) return false;
  const a = Buffer.from(hash(candidate));
  const b = Buffer.from(hash(password));
  return a.length === b.length && timingSafeEqual(a, b);
}

export function tokenIsValid(token: string | undefined | null): boolean {
  const expected = getExpectedToken();
  if (!expected || !token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function tokenFor(password: string): string {
  return hash(password);
}

export function isAuthDisabled(): boolean {
  return !process.env.DEMO_PASSWORD;
}

export function safeRedirectPath(from: string | null | undefined): string {
  if (!from) return '/';
  if (!from.startsWith('/')) return '/';
  if (from.startsWith('//')) return '/';
  if (from.startsWith('/login')) return '/';
  return from;
}
